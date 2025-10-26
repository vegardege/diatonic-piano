import { render } from '@testing-library/react'
import { NoteList } from 'kamasi'
import { describe, expect, it, vi } from 'vitest'
import { Octave } from './Octave.js'
import { THEMES } from './themes.js'

describe('Octave', () => {
  const defaultProps = {
    octaveNum: 4,
    pressed: new NoteList(),
    highlighted: new NoteList(),
    style: THEMES.default!,
    focusable: false,
    onClick: vi.fn(),
    onMouseEnter: vi.fn(),
    onMouseLeave: vi.fn(),
    onFocus: vi.fn(),
    onBlur: vi.fn(),
  }

  it('should render a g element with correct class name', () => {
    const { container } = render(
      <svg>
        <Octave {...defaultProps} octaveNum={4} />
      </svg>,
    )
    const g = container.querySelector('.diatonic-piano-octave-4')
    expect(g).toBeTruthy()
    expect(g?.tagName).toBe('g')
  })

  it('should render 12 keys (7 white + 5 black)', () => {
    const { container } = render(
      <svg>
        <Octave {...defaultProps} />
      </svg>,
    )
    const keys = container.querySelectorAll('path')
    expect(keys.length).toBe(12)
  })

  it('should render all diatonic notes (C, D, E, F, G, A, B)', () => {
    const { container } = render(
      <svg>
        <Octave {...defaultProps} octaveNum={4} />
      </svg>,
    )
    expect(container.querySelector('.diatonic-piano-key-C4')).toBeTruthy()
    expect(container.querySelector('.diatonic-piano-key-D4')).toBeTruthy()
    expect(container.querySelector('.diatonic-piano-key-E4')).toBeTruthy()
    expect(container.querySelector('.diatonic-piano-key-F4')).toBeTruthy()
    expect(container.querySelector('.diatonic-piano-key-G4')).toBeTruthy()
    expect(container.querySelector('.diatonic-piano-key-A4')).toBeTruthy()
    expect(container.querySelector('.diatonic-piano-key-B4')).toBeTruthy()
  })

  it('should render all chromatic notes (C#, D#, F#, G#, A#)', () => {
    const { container } = render(
      <svg>
        <Octave {...defaultProps} octaveNum={4} />
      </svg>,
    )
    expect(container.querySelector('.diatonic-piano-key-Cs4')).toBeTruthy()
    expect(container.querySelector('.diatonic-piano-key-Ds4')).toBeTruthy()
    expect(container.querySelector('.diatonic-piano-key-Fs4')).toBeTruthy()
    expect(container.querySelector('.diatonic-piano-key-Gs4')).toBeTruthy()
    expect(container.querySelector('.diatonic-piano-key-As4')).toBeTruthy()
  })

  it('should mark keys as pressed when note is in pressed list', () => {
    const pressed = new NoteList(['C4', 'E4'])
    const { container } = render(
      <svg>
        <Octave {...defaultProps} pressed={pressed} />
      </svg>,
    )
    const c4 = container.querySelector('.diatonic-piano-key-C4')
    const e4 = container.querySelector('.diatonic-piano-key-E4')
    const d4 = container.querySelector('.diatonic-piano-key-D4')

    expect(c4?.getAttribute('fill')).toBe(THEMES.default!.diatonic!.pressed)
    expect(e4?.getAttribute('fill')).toBe(THEMES.default!.diatonic!.pressed)
    expect(d4?.getAttribute('fill')).toBe(THEMES.default!.diatonic!.fill)
  })

  it('should mark keys as highlighted when note is in highlighted list', () => {
    const highlighted = new NoteList(['C4', 'E4'])
    const { container } = render(
      <svg>
        <Octave {...defaultProps} highlighted={highlighted} />
      </svg>,
    )
    const c4 = container.querySelector('.diatonic-piano-key-C4')
    const e4 = container.querySelector('.diatonic-piano-key-E4')

    expect(c4?.getAttribute('fill')).toBe(THEMES.default!.diatonic!.highlighted)
    expect(e4?.getAttribute('fill')).toBe(THEMES.default!.diatonic!.highlighted)
  })

  it('should work with pitch class matching (enharmonic equivalents)', () => {
    const pressed = new NoteList(['C']) // just pitch class, no octave
    const { container } = render(
      <svg>
        <Octave {...defaultProps} pressed={pressed} octaveNum={4} />
      </svg>,
    )
    const c4 = container.querySelector('.diatonic-piano-key-C4')
    expect(c4?.getAttribute('fill')).toBe(THEMES.default!.diatonic!.pressed)
  })

  it('should apply transform for positioning', () => {
    const { container } = render(
      <svg>
        <Octave {...defaultProps} />
      </svg>,
    )
    const g = container.querySelector('g')
    const transform = g?.getAttribute('transform')
    expect(transform).toContain('translate')
  })

  it('should use different octave numbers correctly', () => {
    const { container: container3 } = render(
      <svg>
        <Octave {...defaultProps} octaveNum={3} />
      </svg>,
    )
    const { container: container5 } = render(
      <svg>
        <Octave {...defaultProps} octaveNum={5} />
      </svg>,
    )

    expect(container3.querySelector('.diatonic-piano-octave-3')).toBeTruthy()
    expect(container3.querySelector('.diatonic-piano-key-C3')).toBeTruthy()

    expect(container5.querySelector('.diatonic-piano-octave-5')).toBeTruthy()
    expect(container5.querySelector('.diatonic-piano-key-C5')).toBeTruthy()
  })
})
