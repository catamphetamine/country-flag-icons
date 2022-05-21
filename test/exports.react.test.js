import FLAGS, { RU } from '../react/3x2/index.js'

import Library from '../react/3x2/index.cjs'

describe('exports/react/3x2', () => {
	it('should export ES6', () => {
		FLAGS.RU.should.be.a('function')
		RU.should.be.a('function')
	})

	it('should export CommonJS', () => {
		// Library.RU.should.be.a('function')
		Library.RU.should.be.a('function')
		expect(Library.default).to.be.undefined
	})
})