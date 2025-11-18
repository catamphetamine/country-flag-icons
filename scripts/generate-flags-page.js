import path from 'path'
import fs from 'fs-extra'

import COUNTRY_CODES from '../source/countries.json' with { type: 'json' }
import countryNames from './countryNames.json' with { type: 'json' }

function generateHTML(aspectRatioWidth, aspectRatioHeight) {
	let html = `
		<html>
			<title>Flags (${aspectRatioWidth}:${aspectRatioHeight})</title>
			<body>
	`

	html += `
		<style>
			body {
				margin: 0;
				font-family: sans-serif;
			}

			.Countries {
				display: flex;
				flex-wrap: wrap;
			}

			.Country {
				flex: 0 0 10%;
				flex-direction: column;
				align-items: center;
				padding: 1em;
				box-sizing: border-box;
				overflow: hidden;
			}

			.CountryFlagContainer {
				position: relative;
				width: 100%;
				padding-bottom: calc(100% * ${aspectRatioHeight} / ${aspectRatioWidth});
			}

			.CountryFlag {
				position: absolute;
				width: 100%;
				height: 100%;
				box-shadow: 0 0 0 1px black;
			}

			.Country h1 {
				text-align: center;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		</style>
	`

	html += '<div class="Countries">'

	for (const countryCode of COUNTRY_CODES) {
		if (!countryNames[countryCode]) {
			throw new Error(`${countryCode} name not found`)
		}
		html += `
			<section class="Country">
				<div class="CountryFlagContainer">
					<a href="https://www.google.com/search?q=${encodeURIComponent(countryNames[countryCode] + ' flag')}&tbm=isch" target="_blank" class="CountryFlagLink">
						<img title="${countryNames[countryCode]}" class="CountryFlag" src="./${countryCode}.svg"/>
					</a>
				</div>
				<h1 title="${countryNames[countryCode]}">
					${countryCode}
				</h1>
			</section>
		`
	}

	html += `
				</div>
			</body>
		</html>
	`

	fs.outputFileSync(path.resolve(`./website/${aspectRatioWidth}x${aspectRatioHeight}/index.html`), html)
}

generateHTML(3, 2)
generateHTML(1, 1)