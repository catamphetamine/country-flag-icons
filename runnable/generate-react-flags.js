import path from 'path'
import fs from 'fs-extra'
import svgr from '@svgr/core'

import COUNTRIES from '../source/countries.json'

fs.outputFileSync(path.join(__dirname, '../source/react/3x2/index.js'), generateFlags())

function generateFlags() {
	return `
import React from "react"

export default {${COUNTRIES.map((country) => {
	return '\n\t' + country + ': ({ title, ...rest }) => (\n' + getCountryFlagSvgMarkup(country) + '\t)'
})}
}
	`.trim()
}

function getCountryFlagSvgMarkup(country) {
	const flagPath = path.join(__dirname, `../3x2/${country.toLowerCase()}.svg`)
	const svgCode = fs.readFileSync(flagPath, 'utf8')
	let code = svgr.sync(
		svgCode,
		{
			plugins: [
				'@svgr/plugin-svgo',
				'@svgr/plugin-jsx',
				'@svgr/plugin-prettier'
			],
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