import { describe, it, expect, beforeAll } from 'vitest'
import { shallowMount, mount, renderToString } from '@vue/test-utils'
import { defineComponent } from 'vue'
import FLAGS, { SV, CountryFlagIcon, LazyCountryFlagIcon } from '../vue/3x2'

describe('exports/vue/3x2', () => {
  const title = 'El Salvador'
  const svViewBox = '0 85.333 512 341.333'
  const krViewBox = '0 0 900 600'
  const defaultProps = { title: undefined, country: 'SV' }
  const props = { title: '한국어', country: 'KR' }
  let sv, svDefault, vFlag, lazyVFlag, vFlagStub, Wrapper

  beforeAll(() => {
    svDefault = shallowMount(FLAGS.SV, {
      props: { title },
    })
    sv = shallowMount(SV, {
      props: { title },
    })
    Wrapper = defineComponent({
      components: { CountryFlagIcon, LazyCountryFlagIcon },
      props: ['title', 'country'],
      template:
        '<CountryFlagIcon :title="title" :country="country" data-test="v-flag" /><LazyCountryFlagIcon :title="title" :country="country" data-test="lazy-v-flag" />',
    })
    vFlagStub = mount(Wrapper)
    vFlag = vFlagStub.getComponent(CountryFlagIcon)
    lazyVFlag = vFlagStub.getComponent(LazyCountryFlagIcon)
  })

  it('should export ES6', () => {
    expect(svDefault.text()).toContain(title)
    expect(sv.text()).toContain(title)
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

  it('should render CountryFlagIcon default options', () => {
    expect(vFlag.exists()).toBe(true)
    expect(vFlag.isVisible()).toBe(true)
    expect(vFlag.props()).toEqual(defaultProps)
    expect(vFlag.attributes()['data-test']).toBe('v-flag')
    expect(vFlag.html()).toContain(svViewBox)
  })
  it('should render LazyCountryFlagIcon default options', async () => {
    await renderToString(lazyVFlag.getCurrentComponent().vnode)

    expect(lazyVFlag.exists()).toBe(true)
    expect(lazyVFlag.isVisible()).toBe(true)
    expect(lazyVFlag.props()).toEqual(defaultProps)
    expect(lazyVFlag.attributes()['data-test']).toBe('lazy-v-flag')
    expect(lazyVFlag.html()).toContain(svViewBox)
  })
  it('should render CountryFlagIcon title', () => {
    vFlagStub = mount(Wrapper, { props: { title } })
    vFlag = vFlagStub.getComponent(CountryFlagIcon)

    expect(vFlag.props()).toEqual({ ...defaultProps, title })
    expect(vFlag.html()).toContain(svViewBox)

    const titleEl = vFlag.find('title')
    expect(titleEl.exists()).toBe(true)
    expect(titleEl.text()).toBe(title)
  })
  it('should render LazyCountryFlagIcon title', async () => {
    vFlagStub = mount(Wrapper, { props: { title } })
    lazyVFlag = vFlagStub.getComponent(LazyCountryFlagIcon)

    await renderToString(lazyVFlag.getCurrentComponent().vnode)

    expect(lazyVFlag.props()).toEqual({ ...defaultProps, title })
    expect(lazyVFlag.html()).toContain(svViewBox)

    const titleEl = lazyVFlag.find('title')
    expect(titleEl.exists()).toBe(true)
    expect(titleEl.text()).toBe(title)
  })
  it('should render CountryFlagIcon country flag', () => {
    vFlagStub = mount(Wrapper, { props })
    vFlag = vFlagStub.getComponent(CountryFlagIcon)

    expect(vFlag.props()).toEqual(props)
    expect(vFlag.html()).toContain(krViewBox)

    const titleEl = vFlag.find('title')
    expect(titleEl.exists()).toBe(true)
    expect(titleEl.text()).toBe(props.title)
  })
  it('should render LazyCountryFlagIcon country flag', async () => {
    vFlagStub = mount(Wrapper, { props })
    lazyVFlag = vFlagStub.getComponent(LazyCountryFlagIcon)

    await renderToString(lazyVFlag.getCurrentComponent().vnode)

    expect(lazyVFlag.props()).toEqual(props)
    expect(lazyVFlag.html()).toContain(krViewBox)

    const titleEl = lazyVFlag.find('title')
    expect(titleEl.exists()).toBe(true)
    expect(titleEl.text()).toBe(props.title)
  })
})
