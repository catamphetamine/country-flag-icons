import {
	hasFlag,
	countries
} from '../index.js'

import Library from '../index.cjs'

describe('exports/core', () => {
	it('should export ES6', () => {
		hasFlag.should.be.a('function')
		countries.includes('RU').should.equal(true)
	})

	it('should export CommonJS', () => {
		Library.hasFlag.should.be.a('function')
		Library.countries.includes('RU').should.equal(true)
	})
})