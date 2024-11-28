import path from 'path'
import fs from 'fs-extra'

import COUNTRIES from '../source/countries.json' assert { type: 'json' }

const generateSFC = (country, aspectRatio) => `<script setup>
defineProps({
  title: String,
})
</script>

<template>
  ${getCountryFlagSvgMarkup(country, aspectRatio)}
</template>
`

const getFlagComponentSFC = (aspectRatio, lazy = false) => {
  return [
    `<script setup>`,
    lazy
      ? "import { defineAsyncComponent } from 'vue'"
      : `import Flags from 'country-flag-icons/vue/${aspectRatio}'`,
    "import { hasFlag } from 'country-flag-icons'",
    '',
    `const props = defineProps({
  title: String,
  country: {
    type: String,
    validate: (code) => hasFlag(code.toUpperCase()),
    default: 'SV',
  },
})`,
    '',
    lazy
      ? `const pathFlag = 'country-flag-icons/vue/3x2/components/' + props.country.toUpperCase() + '.vue'

const Flag = defineAsyncComponent(() => import(pathFlag))`
      : 'const Flag = Flags[props.country]',
    `</script>

<template>
  <component
    :is="Flag"
    :title="title"
  />
</template>
`,
  ].join('\n')
}

const getFlagPackageJson = (aspectRatio) => `{
  "private": true,
  "name": "country-flag-icons/vue/${aspectRatio}",
  "main": "index.js",
  "type": "module",
  "exports": {
    ".": {
      "types": "./index.d.ts",
      "import": "./index.js"
    }
  },
  "sideEffects": false
}`

function generateFlagsForSize(size) {
  fs.outputFileSync(path.resolve(`./source/vue/${size}/index.js`), generateFlags())
  fs.outputFileSync(
    path.resolve(`./vue/${size}/components/CountryFlagIcon.vue`),
    getFlagComponentSFC(size)
  )
  fs.outputFileSync(
    path.resolve(`./vue/${size}/components/LazyCountryFlagIcon.vue`),
    getFlagComponentSFC(size, true)
  )

  for (const country of COUNTRIES) {
    fs.outputFileSync(
      path.resolve(`./vue/${size}/components/${country}.vue`),
      generateSFC(country, size)
    )
  }

  fs.outputFileSync(path.resolve(`./vue/${size}/index.js`), generateIndex(size))
  // fs.outputFileSync(path.resolve(`./vue/${size}/index.cjs`), generateIndexCommonJS(size))
  // fs.outputFileSync(
  //   path.resolve(`./vue/${size}/index.cjs.js`),
  //   generateIndexCommonJS(size)
  // )
  fs.outputFileSync(path.resolve(`./vue/${size}/index.d.ts`), generateTypeScriptTypings())
  fs.outputFileSync(path.resolve(`./vue/${size}/package.json`), getFlagPackageJson(size))

  addFlagExports(size)
}

generateFlagsForSize('3x2')
generateFlagsForSize('1x1')

function generateIndex(aspectRatio) {
  return `
export {
${COUNTRIES.map((country) => '\t' + country + ',').join('\n')}
  CountryFlagIcon,
  LazyCountryFlagIcon,
	default as default,
} from '../../modules/vue/${aspectRatio}/index.js'
	`.trim()
}

function generateIndexCommonJS(aspectRatio) {
  return `
'use strict'

exports = module.exports = {}

var flags = require('../../commonjs/vue/${aspectRatio}/index.js')

${COUNTRIES.map((country) => 'exports.' + country + ' = flags.' + country + ';').join(
  '\n'
)}
	`.trim()
}

function generateTypeScriptTypings() {
  return `

import { DefineComponent } from 'vue'

export type Flag = DefineComponent<{title: string}>;
export type FlagComponent = DefineComponent<{title: string, country: string}>

${COUNTRIES.map((country) => `export const ${country}: Flag`)
  .concat([
    'export const CountryFlagIcon: FlagComponent',
    'export const LazyCountryFlagIcon: FlagComponent',
  ])
  .join('\n')}

	`.trim()
}

function generateFlags() {
  return `
${COUNTRIES.map((country) => {
  return `import ${country} ` + `from './components/${country}.vue';`
})
  .concat([
    "import CountryFlagIcon from './components/CountryFlagIcon.vue'",
    "import LazyCountryFlagIcon from './components/LazyCountryFlagIcon.vue'",
  ])
  .join('\n')}

export { ${COUNTRIES.concat(['CountryFlagIcon', 'LazyCountryFlagIcon']).join(', ')} }

export default { ${COUNTRIES.concat(['CountryFlagIcon', 'LazyCountryFlagIcon']).join(
    ', '
  )} }
	`.trim()
}

function getCountryFlagSvgMarkup(country, aspectRatio) {
  const flagPath = path.resolve(`./${aspectRatio}/${country}.svg`)
  const svgCode = fs.readFileSync(flagPath, 'utf8')
  const svgTagStartsAt = svgCode.indexOf('<svg')

  if (svgTagStartsAt < 0) {
    throw new Error(`<svg/> tag not found in ${country} flag`)
  }

  const firstTagStarts = svgCode.indexOf('<', svgTagStartsAt + 1)

  if (firstTagStarts < 0) {
    throw new Error(`First tag not found in ${country} flag`)
  }
  if (svgCode.indexOf('<title') > 0) {
    throw new Error(`<title/> already present in ${country} flag`)
  }

  return (
    svgCode.slice(0, firstTagStarts) +
    '<title v-if="title">{{title}}</title>' +
    svgCode.slice(firstTagStarts)
  )
}

// Add `export` entries in `package.json`.
function addFlagExports(size) {
  // Read `package.json` file.
  const packageJson = readJsonFromFile('./package.json')

  packageJson.exports ??= packageJson.exports || {}

  // Remove all vue flag exports.
  for (const path of Object.keys(packageJson.exports)) {
    if (path.startsWith(`./vue/${size}`)) {
      delete packageJson.exports[path]
    }
  }

  // Re-add all vue flag exports.
  packageJson.exports = {
    ...packageJson.exports,
    [`./vue/${size}`]: {
      types: `./vue/${size}/index.d.ts`,
      import: `./vue/${size}/index.js`,
    },
  }

  // Save `package.json` file.
  fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2) + '\n', 'utf8')
}

function readJsonFromFile(path) {
  return JSON.parse(fs.readFileSync(path, 'utf8'))
}
