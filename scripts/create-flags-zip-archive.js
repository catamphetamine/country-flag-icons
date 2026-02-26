import path from 'path'
import fs from 'fs'

import ZipArchive from 'archiver-node/zip'

import countries from '../source/countries.json' with { type: 'json' }

const archive = new ZipArchive()

for (const country of countries) {
	archive.includeFile(`3x2/${country}.svg`, `${country}.svg`)
}

archive.write().pipe(fs.createWriteStream('3x2/flags.zip'))