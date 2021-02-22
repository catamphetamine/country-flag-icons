import path from 'path'
import fs from 'fs-extra'
import svgr from '@svgr/core'

import COUNTRIES from '../source/countries.json'

fs.outputFileSync(path.join(__dirname, '../source/react/3x2/index.js'), generateFlags('3x2'))
fs.outputFileSync(path.join(__dirname, '../react/3x2/index.js'), generateIndex('3x2'))
fs.outputFileSync(path.join(__dirname, '../react/3x2/index.commonjs.js'), generateIndexCommonJS('3x2'))

fs.outputFileSync(path.join(__dirname, '../source/react/1x1/index.js'), generateFlags('1x1'))
fs.outputFileSync(path.join(__dirname, '../react/1x1/index.js'), generateIndex('1x1'))
fs.outputFileSync(path.join(__dirname, '../react/1x1/index.commonjs.js'), generateIndexCommonJS('1x1'))

function generateIndex(aspectRatio) {
	return `
export {
${COUNTRIES.map((country) => '\t' + country + ',').join('\n')}
	default as default
} from '../../modules/react/${aspectRatio}'
	`.trim()
}

function generateIndexCommonJS(aspectRatio) {
	return `
'use strict'

exports = module.exports = {}

var flags = require('../../commonjs/react/${aspectRatio}')

${COUNTRIES.map((country) => 'exports.' + country + ' = flags.' + country + ';').join('\n')}
	`.trim()
}

function generateFlags(aspectRatio) {
	return `
import React from "react"
${COUNTRIES.map((country) => {
	return '\n' + 'export var ' + country + ' = ({ title, ...rest }) => (\n' + getCountryFlagSvgMarkup(country, aspectRatio) + ')'
}).join('\n')}

export default {${COUNTRIES.map((country) => {
	return '\n\t' + country + ': ' + country
})}
}
	`.trim()
}

function getCountryFlagSvgMarkup(country, aspectRatio) {
	const flagPath = path.join(__dirname, `../${aspectRatio}/${country}.svg`)
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