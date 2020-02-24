import {
	hasFlag,
	countries
} from '../index'

describe('exports/core', () => {
	it('should export ES6', () => {
		hasFlag.should.be.a('function')
		countries.includes('RU').should.equal(true)
	})

	it('should export CommonJS', () => {
		const Library = require('../index.commonjs')
		Library.hasFlag.should.be.a('function')
		Library.countries.includes('RU').should.equal(true)
	})
})