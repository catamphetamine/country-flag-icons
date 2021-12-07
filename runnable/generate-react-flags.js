import path from 'path'
import fs from 'fs-extra'
import svgr from '@svgr/core'

import COUNTRIES from '../source/countries.json'

const getFlagPackageJson = (country, aspectRatio) => `{
  "private": true,
  "name": "country-flag-icons/react/${aspectRatio}/${country}",
  "version": "1.0.0",
  "main": "index.commonjs.js",
  "module": "index.js"
}`

const getFlagTypeScriptTypings = () => `
import * as React from 'react';

interface Props extends React.HTMLAttributes<HTMLElement> {
	title?: string;
}

// React TypeScript Cheatsheet doesn't recommend using React.FunctionalComponent.
// https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/function_components
// declare const ReactTimeAgo: React.FC<Props>;

type FlagComponent = (props: Props) => JSX.Element;

declare const Flag: FlagComponent;

export default Flag;
`.trim()

// const getFlagIndex = (country) => `export { ${country} as default } from '../../../modules/react/${aspectRatio}/${country}'`
// const getFlagIndexCommonJs = (country) => `exports = module.exports = require('../../../commonjs/react/${aspectRatio}/${country}').${country}`

const getFlagIndex = (country) => `export { ${country} as default } from '../index'`
const getFlagIndexCommonJs = (country) => `exports = module.exports = require('../index.commonjs').${country}`

fs.outputFileSync(path.join(__dirname, '../source/react/3x2/index.js'), generateFlags('3x2'))

for (const country of COUNTRIES) {
	// fs.outputFileSync(path.join(__dirname, `../source/react/3x2/${country}.js`), generateFlag(country, '3x2'))
	fs.outputFileSync(path.join(__dirname, `../react/3x2/${country}/index.js`), getFlagIndex(country))
	fs.outputFileSync(path.join(__dirname, `../react/3x2/${country}/index.commonjs.js`), getFlagIndexCommonJs(country))
	fs.outputFileSync(path.join(__dirname, `../react/3x2/${country}/package.json`), getFlagPackageJson(country, '3x2'))
	fs.outputFileSync(path.join(__dirname, `../react/3x2/${country}/index.d.ts`), getFlagTypeScriptTypings())
}

fs.outputFileSync(path.join(__dirname, '../react/3x2/index.js'), generateIndex('3x2'))
fs.outputFileSync(path.join(__dirname, '../react/3x2/index.commonjs.js'), generateIndexCommonJS('3x2'))
fs.outputFileSync(path.join(__dirname, '../react/3x2/index.d.ts'), generateTypeScriptTypings())

fs.outputFileSync(path.join(__dirname, '../source/react/1x1/index.js'), generateFlags('1x1'))

for (const country of COUNTRIES) {
	// fs.outputFileSync(path.join(__dirname, `../source/react/1x1/${country}.js`), generateFlag(country, '1x1'))
	fs.outputFileSync(path.join(__dirname, `../react/1x1/${country}/index.js`), getFlagIndex(country))
	fs.outputFileSync(path.join(__dirname, `../react/1x1/${country}/index.commonjs.js`), getFlagIndexCommonJs(country))
	fs.outputFileSync(path.join(__dirname, `../react/1x1/${country}/package.json`), getFlagPackageJson(country, '1x1'))
	fs.outputFileSync(path.join(__dirname, `../react/1x1/${country}/index.d.ts`), getFlagTypeScriptTypings())
}

fs.outputFileSync(path.join(__dirname, '../react/1x1/index.js'), generateIndex('1x1'))
fs.outputFileSync(path.join(__dirname, '../react/1x1/index.commonjs.js'), generateIndexCommonJS('1x1'))
fs.outputFileSync(path.join(__dirname, '../react/1x1/index.d.ts'), generateTypeScriptTypings())

function generateIndex(aspectRatio) {
	return `
export {
${COUNTRIES.map((country) => '\t' + country + ',').join('\n')}
	default as default
} from '../../modules/react/${aspectRatio}'
	`.trim()
}

function generateIndexCommonJS(aspectRatio) {
	return `
'use strict'

exports = module.exports = {}

var flags = require('../../commonjs/react/${aspectRatio}')

${COUNTRIES.map((country) => 'exports.' + country + ' = flags.' + country + ';').join('\n')}
	`.trim()
}

function generateTypeScriptTypings() {
	return `

import * as React from 'react';

interface Props extends React.HTMLAttributes<HTMLElement> {
	title?: string;
}

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
	const flagPath = path.join(__dirname, `../${aspectRatio}/${country}.svg`)
	const svgCode = fs.readFileSync(flagPath, 'utf8')
	let code = svgr.sync(
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
	return code.replace('import React from "react";\n\nconst SvgComponent = props => (\n', '')
		.replace(' {...props}', ' {...rest}')
		.replace('\n);\n\nexport default SvgComponent;', '')
}