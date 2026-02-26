import { describe, it } from 'mocha'
import { expect } from 'chai'

import FLAGS, { RU } from '../../react/3x2/index.js'
import TestRenderer from 'react-test-renderer'

import Library from '../../react/3x2/index.cjs'

describe('exports/react/3x2', () => {
   it('should export ES6', () => {
      expect(FLAGS.RU).to.be.a('function')
      expect(RU).to.be.a('function')
   })

   it('should export CommonJS', () => {
      expect(Library.RU).to.be.a('function')
      expect(Library.default).to.be.undefined
   })

   it('should render an svg element', () => {
      const flag = RU({})

      const testRenderer = TestRenderer.create(flag)
      const result = testRenderer.toJSON()

      expect(result).to.contain({ type: 'svg' })
   })
})
