import path from 'path'
import fs from 'fs'

const countries = []
fs.readdirSync(path.resolve('./flags/3x2')).map((filename) => {
	if (filename.indexOf('.svg') !== 2) {
		return
	}
	countries.push(filename.slice(0, 2))
})

fs.writeFileSync(path.join('./source/countries.json'), JSON.stringify(countries))

// Stupid Node.js can't even `import` JSON files.
// https://stackoverflow.com/questions/72348042/typeerror-err-unknown-file-extension-unknown-file-extension-json-for-node
fs.writeFileSync(path.join('./source/countries.json.js'), 'export default ' + JSON.stringify(countries))