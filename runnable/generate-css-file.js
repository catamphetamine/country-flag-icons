import path from 'path'
import fs from 'fs-extra'
import svgr from '@svgr/core'
import svgToMiniDataURI from 'mini-svg-data-uri'

import COUNTRIES from '../source/countries.json'

fs.outputFileSync(path.join(__dirname, '../css/flags.css'), generateCSS())

function generateCSS() {
    return [
        `[class*=' flag:'],[class^='flag:']{display:inline-block;background-size:cover;background-position:center;height:0.666667em;width:1em}`,
    ].concat(COUNTRIES.map((country) => getCountryFlagCSS(country))).join('\n')
}

function getCountryFlagCSS(country) {
	const flagPath = path.join(__dirname, `../3x2/${country}.svg`)
	const svgCode = fs.readFileSync(flagPath, 'utf8')
	const code = svgr.sync(
		svgCode,
		{
			plugins: [
				'@svgr/plugin-svgo',
			],
		}
	)
	const svgTagStartsAt = code.indexOf('<svg')
	if (svgTagStartsAt < 0) {
		throw new Error(`<svg/> tag not found in ${country} flag`)
    }
    return `.flag\\:${country}{background-image:url("${svgToMiniDataURI(code.substr(svgTagStartsAt))}")}`
}