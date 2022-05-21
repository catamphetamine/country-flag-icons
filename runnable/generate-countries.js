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