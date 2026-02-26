import { describe, it } from 'mocha'
import { expect } from 'chai'

import hasFlag from './hasFlag.js'

describe('hasFlag', () => {
	it('should return whether a flag icon exists', () => {
		expect(hasFlag('RU')).to.equal(true)
		expect(hasFlag('ZZ')).to.equal(false)
	})
})