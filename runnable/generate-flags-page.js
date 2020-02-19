import path from 'path'
import fs from 'fs'
import COUNTRIES from '../source/countries.json'
import countryNames from './countryNames.json'

let html = `
	<html>
		<title>Flags (3x2)</title>
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
			padding-bottom: calc(100% * 2 / 3);
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

for (const country of COUNTRIES) {
	if (!countryNames[country]) {
		throw new Error(`${country} name not found`)
	}
	html += `
		<section class="Country">
			<div class="CountryFlagContainer">
				<img title="${countryNames[country]}" class="CountryFlag" src="./${country}.svg"/>
			</div>
			<h1>${country}</h1>
		</section>
	`
}

html += `
			</div>
		</body>
	</html>
`

fs.writeFileSync(path.join(__dirname, '../website/3x2/index.html'), html)