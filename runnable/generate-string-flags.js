import fs from 'fs-extra'
import path from 'path'

import COUNTRIES from '../source/countries.json'

['3x2', '1x1'].forEach((size) => {
  const flagsDirectory = path.join(__dirname, '..', size)
  const outputDirectory = path.join(__dirname, '..', 'string', size)

  COUNTRIES.forEach(country => {
    fs.outputFileSync(
      path.join(outputDirectory, `${country}.js`),
      `export default '${fs.readFileSync(path.join(flagsDirectory, `${country}.svg`), 'utf8')}'`
    )
  })

  fs.outputFileSync(
    path.join(outputDirectory, 'index.js'),
    COUNTRIES.map(country => `export { default as ${country} } from './${country}'`).join('\n')
  )

  fs.outputFileSync(
    path.join(outputDirectory, 'index.commonjs.js'),
    COUNTRIES.map(country => `exports.${country} = '${fs.readFileSync(path.join(flagsDirectory, `${country}.svg`), 'utf8')}'`).join('\n')
  )

  fs.outputFileSync(
    path.join(outputDirectory, 'index.d.ts'),
    COUNTRIES.map(country => `export declare const ${country}: string`).join('\n')
  )
})
