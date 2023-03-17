import path from 'path'
import fs from 'fs-extra'
import svgr from '@svgr/core'
import svgToMiniDataURI from 'mini-svg-data-uri'

import COUNTRIES from '../source/countries.json' assert { type: 'json' }

fs.outputFileSync(path.resolve('./3x2/flags.css'), generateCSS(3, 2))
fs.outputFileSync(path.resolve('./1x1/flags.css'), generateCSS(1, 1))

function generateCSS(aspectRatioWidth, aspectRatioHeight) {
	return [
		`
			[class*=' flag:'],
			[class^='flag:'] {
				display: inline-block;
				background-size: cover;
				height: 1em;
				width: ${round(aspectRatioWidth / aspectRatioHeight)}em;
				--CountryFlagIcon-height: 1em;
				height: var(--CountryFlagIcon-height);
				width: calc(var(--CountryFlagIcon-height)*${aspectRatioWidth}/${aspectRatioHeight});
			}
		`.replace(/: /g, ':').replace(/[\t\n]/g, '').trim(),
	].concat(COUNTRIES.map((country) => getCountryFlagCSS(country, aspectRatioWidth, aspectRatioHeight))).join('\n')
}

function getCountryFlagCSS(country, aspectRatioWidth, aspectRatioHeight) {
	const flagPath = path.resolve(`./${aspectRatioWidth}x${aspectRatioHeight}/${country}.svg`)
	const svgCode = fs.readFileSync(flagPath, 'utf8')
	const code = svgr.transform.sync(
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

function round(number) {
  return Math.round(number * 1000) / 1000
}