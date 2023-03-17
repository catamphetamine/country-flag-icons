import path from 'path'
import fs from 'fs-extra'
import svgr from '@svgr/core'

import COUNTRIES from '../source/countries.json' assert { type: 'json' }

const getFlagPackageJson = (country, aspectRatio) => `{
  "private": true,
  "name": "country-flag-icons/react/${aspectRatio}/${country}",
  "main": "index.cjs",
  "module": "index.js",
  "type": "module",
  "exports": {
    ".": {
      "types": "./index.d.ts",
      "import": "./index.js",
      "require": "./index.cjs"
    }
  },
  "sideEffects": false
}`

const getFlagTypeScriptTypings = () => `
import * as React from 'react';

// https://stackoverflow.com/questions/63165896/what-is-the-type-of-the-svg-element-in-typescript
type HTMLSVGElement = HTMLElement & SVGElement;

interface Props extends React.HTMLAttributes<HTMLSVGElement> {}

// React TypeScript Cheatsheet doesn't recommend using React.FunctionalComponent.
// https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/function_components
// declare const ReactTimeAgo: React.FC<Props>;

type FlagComponent = (props: Props) => JSX.Element;

declare const Flag: FlagComponent;

export default Flag;
`.trim()

// const getFlagIndex = (country) => `export { ${country} as default } from '../../../modules/react/${aspectRatio}/${country}'`
// const getFlagIndexCommonJs = (country) => `exports = module.exports = require('../../../commonjs/react/${aspectRatio}/${country}').${country}`

const getFlagIndex = (country) => `export { ${country} as default } from '../index.js'`
const getFlagIndexCommonJs = (country) => `exports = module.exports = require('../index.cjs').${country}`

function generateFlagsForSize(size) {
	fs.outputFileSync(path.resolve(`./source/react/${size}/index.js`), generateFlags(size))

	for (const country of COUNTRIES) {
		// fs.outputFileSync(path.resolve(`./source/react/${size}/${country}.js`), generateFlag(country, size))
		fs.outputFileSync(path.resolve(`./react/${size}/${country}/index.js`), getFlagIndex(country))
		fs.outputFileSync(path.resolve(`./react/${size}/${country}/index.cjs`), getFlagIndexCommonJs(country))
		fs.outputFileSync(path.resolve(`./react/${size}/${country}/index.cjs.js`), getFlagIndexCommonJs(country))
		fs.outputFileSync(path.resolve(`./react/${size}/${country}/package.json`), getFlagPackageJson(country, size))
		fs.outputFileSync(path.resolve(`./react/${size}/${country}/index.d.ts`), getFlagTypeScriptTypings())
	}

	fs.outputFileSync(path.resolve(`./react/${size}/index.js`), generateIndex(size))
	fs.outputFileSync(path.resolve(`./react/${size}/index.cjs`), generateIndexCommonJS(size))
	fs.outputFileSync(path.resolve(`./react/${size}/index.cjs.js`), generateIndexCommonJS(size))
	fs.outputFileSync(path.resolve(`./react/${size}/index.d.ts`), generateTypeScriptTypings())

	addFlagExports(COUNTRIES, size)
}

generateFlagsForSize('3x2')
generateFlagsForSize('1x1')

function generateIndex(aspectRatio) {
	return `
export {
${COUNTRIES.map((country) => '\t' + country + ',').join('\n')}
	default as default
} from '../../modules/react/${aspectRatio}/index.js'
	`.trim()
}

function generateIndexCommonJS(aspectRatio) {
	return `
'use strict'

exports = module.exports = {}

var flags = require('../../commonjs/react/${aspectRatio}/index.js')

${COUNTRIES.map((country) => 'exports.' + country + ' = flags.' + country + ';').join('\n')}
	`.trim()
}

function generateTypeScriptTypings() {
	return `

import * as React from 'react';

// https://stackoverflow.com/questions/63165896/what-is-the-type-of-the-svg-element-in-typescript
// https://microsoft.github.io/PowerBI-JavaScript/interfaces/_node_modules_typedoc_node_modules_typescript_lib_lib_dom_d_.htmlelement.html
// https://microsoft.github.io/PowerBI-JavaScript/interfaces/_node_modules_typedoc_node_modules_typescript_lib_lib_dom_d_.svgelement.html
type HTMLSVGElement = HTMLElement & SVGElement;

// https://use-form.netlify.app/interfaces/_node_modules__types_react_index_d_.react.htmlattributes.html
// https://use-form.netlify.app/interfaces/_node_modules__types_react_index_d_.react.svgattributes.html
interface ElementAttributes<T> extends React.HTMLAttributes<T>, React.SVGAttributes<T> {}

interface Props extends ElementAttributes<HTMLSVGElement> {}

// React TypeScript Cheatsheet doesn't recommend using React.FunctionalComponent.
// https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/function_components
// declare const ReactTimeAgo: React.FC<Props>;

type FlagComponent = (props: Props) => JSX.Element;

${COUNTRIES.map(country => `export const ${country}: FlagComponent`).join('\n')}

	`.trim()
}

// ${COUNTRIES.map((country) => {
// 	return 'export { default as ' + country + ' } from \'./' + country + '\''
// }).join('\n')}

function generateFlags(aspectRatio) {
	return `
import React from "react"
${COUNTRIES.map((country) => {
	return '\n' + 'export var ' + country + ' = ({ title, ...rest }) => (\n' + getCountryFlagSvgMarkup(country, aspectRatio) + ')'
}).join('\n')}

export default {${COUNTRIES.map((country) => {
	return '\n\t' + country + ': ' + country
})}
}
	`.trim()
}

function generateFlag(country, aspectRatio) {
	return `
import React from "react"
export default ({ title, ...rest }) => (\n${getCountryFlagSvgMarkup(country, aspectRatio)})
	`.trim()
}

function getCountryFlagSvgMarkup(country, aspectRatio) {
	const flagPath = path.resolve(`./${aspectRatio}/${country}.svg`)
	const svgCode = fs.readFileSync(flagPath, 'utf8')
	let code = svgr.transform.sync(
		svgCode,
		{
			plugins: [
				'@svgr/plugin-svgo',
				'@svgr/plugin-jsx',
				'@svgr/plugin-prettier'
			]
		}
	)
	const svgTagStartsAt = code.indexOf('<svg')
	if (svgTagStartsAt < 0) {
		throw new Error(`<svg/> tag not found in ${country} flag`)
	}
	const firstTagStarts = code.indexOf('<', svgTagStartsAt + 1)
	if (firstTagStarts < 0) {
		throw new Error(`First tag not found in ${country} flag`)
	}
	if (code.indexOf('<title') > 0) {
		throw new Error(`<title/> already present in ${country} flag`)
	}
	code = code.slice(0, firstTagStarts) + '{title && <title>{title}</title>}' + '\n' + code.slice(firstTagStarts)
	code = code.replace('import * as React from "react";\n\nconst SvgComponent = (props) => (\n', '')
		.replace(' {...props}', ' {...rest}')
		.replace('\n);\n\nexport default SvgComponent;', '')
	if (code.includes('export default') || code.includes('from "react"')) {
		throw new Error('`@svgr/core` library\'s code transforms seems to have changed. Fix the `runnable/generate-react-flags.js` script.')
	}
	return code
}

// Add `export` entries in `package.json`.
function addFlagExports(COUNTRIES, size) {
  // Read `package.json` file.
  const packageJson = readJsonFromFile('./package.json')

  // Remove all react flag exports.
  for (const path of Object.keys(packageJson.exports)) {
    if (path.startsWith(`./react/${size}/`)) {
      delete packageJson.exports[path]
    }
  }

  // Re-add all react flag exports.
  packageJson.exports = {
    ...packageJson.exports,
    ...COUNTRIES.reduce((all, country) => {
      all[`./react/${size}/${country}`] = {
	      types: `./react/${size}/${country}/index.d.ts`,
	      import: `./react/${size}/${country}/index.js`,
	      require: `./react/${size}/${country}/index.cjs`
      }
      return all
    }, {})
  }

  // Save `package.json` file.
  fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2) + '\n', 'utf8')
}

function readJsonFromFile(path) {
  return JSON.parse(fs.readFileSync(path, 'utf8'))
}
