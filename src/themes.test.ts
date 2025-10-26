import { describe, expect, it } from 'vitest'
import { THEMES } from './themes.js'

describe('THEMES', () => {
  const defaultTheme = THEMES.default!

  it('should have a default theme', () => {
    expect(defaultTheme).toBeDefined()
  })

  it('should have diatonic and chromatic key styles in default theme', () => {
    expect(defaultTheme.diatonic).toBeDefined()
    expect(defaultTheme.chromatic).toBeDefined()
  })

  it('should have all required KeyStyle properties for diatonic keys', () => {
    const diatonic = defaultTheme.diatonic
    expect(diatonic.fill).toBeDefined()
    expect(diatonic.pressed).toBeDefined()
    expect(diatonic.highlighted).toBeDefined()
    expect(diatonic.stroke).toBeDefined()
    expect(diatonic.strokeWidth).toBeDefined()
    expect(diatonic.height).toBeDefined()
    expect(diatonic.width).toBeDefined()
    expect(diatonic.rx).toBeDefined()
  })

  it('should have all required KeyStyle properties for chromatic keys', () => {
    const chromatic = defaultTheme.chromatic
    expect(chromatic.fill).toBeDefined()
    expect(chromatic.pressed).toBeDefined()
    expect(chromatic.highlighted).toBeDefined()
    expect(chromatic.stroke).toBeDefined()
    expect(chromatic.strokeWidth).toBeDefined()
    expect(chromatic.height).toBeDefined()
    expect(chromatic.width).toBeDefined()
    expect(chromatic.rx).toBeDefined()
  })
})
