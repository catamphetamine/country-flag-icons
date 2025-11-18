import fs from 'fs-extra'
import path from 'path'

import COUNTRY_CODES from '../source/countries.json' with { type: 'json' }

['3x2', '1x1'].forEach((size) => {
  const flagsDirectory = path.resolve(size)
  const outputDirectory = path.join('string', size)

  COUNTRY_CODES.forEach((countryCode) => {
    fs.outputFileSync(
      path.join(outputDirectory, `${countryCode}.js`),
      `export default '${fs.readFileSync(path.join(flagsDirectory, `${countryCode}.svg`), 'utf8')}'`
    )
  })

  fs.outputFileSync(
    path.join(outputDirectory, 'index.js'),
    COUNTRY_CODES.map(countryCode => `export { default as ${getVariableNameForCountryCode(countryCode)} } from './${countryCode}.js'`).join('\n')
  )

  fs.outputFileSync(
    path.join(outputDirectory, 'index.cjs'),
    COUNTRY_CODES.map(countryCode => `exports.${getVariableNameForCountryCode(countryCode)} = '${fs.readFileSync(path.join(flagsDirectory, `${countryCode}.svg`), 'utf8')}'`).join('\n')
  )

  fs.outputFileSync(
    path.join(outputDirectory, 'index.cjs.js'),
    COUNTRY_CODES.map(countryCode => `exports.${getVariableNameForCountryCode(countryCode)} = '${fs.readFileSync(path.join(flagsDirectory, `${countryCode}.svg`), 'utf8')}'`).join('\n')
  )

  fs.outputFileSync(
    path.join(outputDirectory, 'index.d.ts'),
    COUNTRY_CODES.map(countryCode => `export const ${getVariableNameForCountryCode(countryCode)}: string`).join('\n')
  )

  addFlagExports(COUNTRY_CODES, size)
})

// Add `export` entries in `package.json`.
function addFlagExports(COUNTRY_CODES, size) {
  // Read `package.json` file.
  const packageJson = readJsonFromFile('./package.json')

  // Remove all string flag exports.
  for (const path of Object.keys(packageJson.exports)) {
    if (path.startsWith(`./string/${size}/`)) {
      delete packageJson.exports[path]
    }
  }

  // Re-add all string flag exports.
  packageJson.exports = {
    ...packageJson.exports,
    ...COUNTRY_CODES.reduce((all, countryCode) => {
      all[`./string/${size}/${countryCode}`] = `./string/${size}/${countryCode}.js`
      return all
    }, {})
  }

  // Save `package.json` file.
  fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2) + '\n', 'utf8')
}

function readJsonFromFile(path) {
  return JSON.parse(fs.readFileSync(path, 'utf8'))
}

function getVariableNameForCountryCode(countryCode) {
	return countryCode.replaceAll('-', '_')
}
