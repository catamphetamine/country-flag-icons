import { describe, it, expect, beforeAll } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import FLAGS, { SV } from '../vue/3x2'

describe('exports/vue/3x2', () => {
  const title = 'El Salvador'
  let sv, svDefault
  beforeAll(() => {
    svDefault = shallowMount(FLAGS.SV, {
      props: { title },
    })
    sv = shallowMount(SV, {
      props: { title },
    })
  })
  it('should export ES6', () => {
    expect(svDefault.text()).to.include(title)
    expect(sv.text()).to.include(title)
  })

  it('should render an svg element', () => {
    const svg = sv.find('svg')

    expect(svg.exists()).toBe(true)
  })
  it('should render a title in svg element', () => {
    const svg = sv.get('svg')
    const titleEl = svg.find('title')

    expect(titleEl.exists()).toBe(true)
  })
})
