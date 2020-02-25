import path from 'path'
import fs from 'fs-extra'
import svgr from '@svgr/core'
import svgToMiniDataURI from 'mini-svg-data-uri'

import COUNTRIES from '../source/countries.json'

fs.outputFileSync(path.join(__dirname, '../3x2/flags.css'), generateCSS())

function generateCSS() {
	return [
		`
			[class*=' flag:'],
			[class^='flag:'] {
				display: inline-block;
				background-size: cover;
				height: 1em;
				width: 1.5em;
				--CountryFlagIcon-height: 1em;
				height: var(--CountryFlagIcon-height);
				width: calc(var(--CountryFlagIcon-height)*3/2);
			}
		`.replace(/: /g, ':').replace(/[\t\n]/g, '').trim(),
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