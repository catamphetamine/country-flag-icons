describe('exports/string/3x2', () => {
	it('should export all flags as named exports', () => {
		const flags = require('../string/3x2')
		expect(flags.US).to.be.string
		expect(flags.RU).to.be.string
	})

	it('should export individual flags as default export', () => {
		const US = require('../string/3x2/US')
		const RU = require('../string/3x2/RU')
		expect(US.default).to.be.string
		expect(RU.default).to.be.string
	})
})