import {
	hasFlag
} from '../index'

describe('exports/core', () => {
	it('should export ES6', () => {
		hasFlag.should.be.a('function')
	})

	it('should export CommonJS', () => {
		const Library = require('../index.commonjs')
		Library.hasFlag.should.be.a('function')
	})
})