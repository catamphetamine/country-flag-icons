import { US as US_, RU as RU_ } from '../string/3x2/index.js'
import flags from '../string/3x2/index.cjs'

import US from '../string/3x2/US.js'
import RU from '../string/3x2/RU.js'

describe('exports/string/3x2', () => {
	it('should export all flags as named exports', () => {
		expect(US_).to.be.string
		expect(RU_).to.be.string
	})

	it('should export all flags as named exports (CommonJS)', () => {
		expect(flags.US).to.be.string
		expect(flags.RU).to.be.string
	})

	it('should export individual flags as default export', () => {
		expect(US.default).to.be.string
		expect(RU.default).to.be.string
	})
})