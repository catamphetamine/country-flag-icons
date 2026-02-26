import { describe, it } from 'mocha'
import { expect } from 'chai'

import {
	hasFlag,
	countries
} from '../../index.js'

import Library from '../../index.cjs'

describe('exports/core', () => {
	it('should export ES6', () => {
		expect(hasFlag).to.be.a('function')
		expect(countries.includes('RU')).to.equal(true)
	})

	it('should export CommonJS', () => {
		expect(Library.hasFlag).to.be.a('function')
		expect(Library.countries.includes('RU')).to.equal(true)
	})
})