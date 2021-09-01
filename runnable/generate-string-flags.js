import fs from 'fs-extra'
import path from 'path'

import COUNTRIES from '../source/countries.json'


['3x2', '1x1'].forEach(size => {
  const srcDir = path.join(__dirname, '..', size)
  const destDir = path.join(__dirname, '..', 'string', size)

  const toDefaultExportStmnt = country => (
    `export default '${fs.readFileSync(path.join(srcDir, `${country}.svg`), 'utf8')}';\n`
  )

  const toNamedReExportStmt = country => (
    `export { default as ${country} } from './${country}';\n`
  )

  COUNTRIES.forEach(country => {
    fs.outputFileSync(
      path.join(destDir, `${country}.js`),
      toDefaultExportStmnt(country)
    )
  })

  const indexExport = COUNTRIES.map(toNamedReExportStmt).join('')

  fs.outputFileSync(
    path.join(destDir, 'index.js'),
    indexExport
  )
})
