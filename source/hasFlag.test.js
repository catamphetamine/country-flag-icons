import hasFlag from './hasFlag.js'

describe('hasFlag', () => {
	it('should return whether a flag icon exists', () => {
		hasFlag('RU').should.equal(true)
		hasFlag('ZZ').should.equal(false)
	})
})