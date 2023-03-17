import fs from 'fs-extra'
import path from 'path'

import COUNTRIES from '../source/countries.json' assert { type: 'json' }

['3x2', '1x1'].forEach((size) => {
  const flagsDirectory = path.resolve(size)
  const outputDirectory = path.join('string', size)

  COUNTRIES.forEach(country => {
    fs.outputFileSync(
      path.join(outputDirectory, `${country}.js`),
      `export default '${fs.readFileSync(path.join(flagsDirectory, `${country}.svg`), 'utf8')}'`
    )
  })

  fs.outputFileSync(
    path.join(outputDirectory, 'index.js'),
    COUNTRIES.map(country => `export { default as ${country} } from './${country}.js'`).join('\n')
  )

  fs.outputFileSync(
    path.join(outputDirectory, 'index.cjs'),
    COUNTRIES.map(country => `exports.${country} = '${fs.readFileSync(path.join(flagsDirectory, `${country}.svg`), 'utf8')}'`).join('\n')
  )

  fs.outputFileSync(
    path.join(outputDirectory, 'index.cjs.js'),
    COUNTRIES.map(country => `exports.${country} = '${fs.readFileSync(path.join(flagsDirectory, `${country}.svg`), 'utf8')}'`).join('\n')
  )

  fs.outputFileSync(
    path.join(outputDirectory, 'index.d.ts'),
    COUNTRIES.map(country => `export const ${country}: string`).join('\n')
  )

  addFlagExports(COUNTRIES, size)
})

// Add `export` entries in `package.json`.
function addFlagExports(COUNTRIES, size) {
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
    ...COUNTRIES.reduce((all, country) => {
      all[`./string/${size}/${country}`] = `./string/${size}/${country}.js`
      return all
    }, {})
  }

  // Save `package.json` file.
  fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2) + '\n', 'utf8')
}

function readJsonFromFile(path) {
  return JSON.parse(fs.readFileSync(path, 'utf8'))
}
