import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { NoteList } from 'kamasi'
import { describe, expect, it, vi } from 'vitest'
import { Piano } from './Piano.js'
import { THEMES } from './themes.js'

describe('Piano', () => {
  it('should render an svg element', () => {
    const { container } = render(<Piano />)
    const svg = container.querySelector('svg')
    expect(svg).toBeTruthy()
    expect(svg?.tagName).toBe('svg')
  })

  it('should have class diatonic-piano', () => {
    const { container } = render(<Piano />)
    const svg = container.querySelector('.diatonic-piano')
    expect(svg).toBeTruthy()
  })

  it('should have role="img"', () => {
    const { container } = render(<Piano />)
    const svg = container.querySelector('svg')
    expect(svg?.getAttribute('role')).toBe('img')
  })

  it('should have title element', () => {
    render(<Piano />)
    expect(screen.getByText('Piano')).toBeTruthy()
  })

  it('should render 2 octaves by default', () => {
    const { container } = render(<Piano />)
    const octaves = container.querySelectorAll(
      '[class^="diatonic-piano-octave-"]',
    )
    expect(octaves.length).toBe(2)
  })

  it('should render custom number of octaves', () => {
    const { container } = render(<Piano octaves={3} />)
    const octaves = container.querySelectorAll(
      '[class^="diatonic-piano-octave-"]',
    )
    expect(octaves.length).toBe(3)
  })

  it('should render 24 keys for 2 octaves (12 per octave)', () => {
    const { container } = render(<Piano octaves={2} />)
    const keys = container.querySelectorAll('path')
    expect(keys.length).toBe(24)
  })

  it('should accept width prop', () => {
    const { container } = render(<Piano width="500px" />)
    const svg = container.querySelector('svg')
    expect(svg?.getAttribute('width')).toBe('500px')
  })

  it('should accept height prop', () => {
    const { container } = render(<Piano height="300px" />)
    const svg = container.querySelector('svg')
    expect(svg?.getAttribute('height')).toBe('300px')
  })

  it('should accept preserveAspectRatio prop', () => {
    const { container } = render(<Piano preserveAspectRatio="xMidYMid meet" />)
    const svg = container.querySelector('svg')
    expect(svg?.getAttribute('preserveAspectRatio')).toBe('xMidYMid meet')
  })

  it('should accept pressed keys as array of strings', () => {
    const { container } = render(<Piano pressed={['C4', 'E4', 'G4']} />)
    const c4 = container.querySelector('.diatonic-piano-key-C4')
    const e4 = container.querySelector('.diatonic-piano-key-E4')
    const g4 = container.querySelector('.diatonic-piano-key-G4')

    expect(c4?.getAttribute('fill')).toBe(THEMES!.default!.diatonic!.pressed)
    expect(e4?.getAttribute('fill')).toBe(THEMES!.default!.diatonic!.pressed)
    expect(g4?.getAttribute('fill')).toBe(THEMES!.default!.diatonic!.pressed)
  })

  it('should accept pressed keys as space-separated string', () => {
    const { container } = render(<Piano pressed="C4 E4 G4" />)
    const c4 = container.querySelector('.diatonic-piano-key-C4')
    expect(c4?.getAttribute('fill')).toBe(THEMES!.default!.diatonic!.pressed)
  })

  it('should accept pressed keys as NoteList', () => {
    const { container } = render(<Piano pressed={new NoteList(['C4', 'E4'])} />)
    const c4 = container.querySelector('.diatonic-piano-key-C4')
    expect(c4?.getAttribute('fill')).toBe(THEMES!.default!.diatonic!.pressed)
  })

  it('should accept highlighted keys', () => {
    const { container } = render(<Piano highlighted={['D4', 'F4']} />)
    const d4 = container.querySelector('.diatonic-piano-key-D4')
    const f4 = container.querySelector('.diatonic-piano-key-F4')

    expect(d4?.getAttribute('fill')).toBe(
      THEMES!.default!.diatonic!.highlighted,
    )
    expect(f4?.getAttribute('fill')).toBe(
      THEMES!.default!.diatonic!.highlighted,
    )
  })

  it('should call onClick when a key is clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    const { container } = render(<Piano onClick={onClick} />)
    const c4 = container.querySelector('.diatonic-piano-key-C4')

    if (c4) {
      await user.click(c4)
      expect(onClick).toHaveBeenCalledWith('C4')
    }
  })

  it('should call onMouseEnter when hovering a key', async () => {
    const user = userEvent.setup()
    const onMouseEnter = vi.fn()
    const { container } = render(<Piano onMouseEnter={onMouseEnter} />)
    const c4 = container.querySelector('.diatonic-piano-key-C4')

    if (c4) {
      await user.hover(c4)
      expect(onMouseEnter).toHaveBeenCalledWith('C4')
    }
  })

  it('should make keys focusable when focusable prop is true', () => {
    const { container } = render(<Piano focusable={true} />)
    const keys = container.querySelectorAll('path')
    keys.forEach(key => {
      expect(key.tabIndex).toBeGreaterThan(0)
    })
  })

  it('should make keys non-focusable when focusable prop is false', () => {
    const { container } = render(<Piano focusable={false} />)
    const keys = container.querySelectorAll('path')
    keys.forEach(key => {
      expect(key.tabIndex).toBe(-1)
    })
  })

  it('should apply custom diatonic styles', () => {
    const { container } = render(
      <Piano
        style={{
          diatonic: { fill: '#FF0000', height: 500 },
        }}
      />,
    )
    const c4 = container.querySelector('.diatonic-piano-key-C4')
    expect(c4?.getAttribute('fill')).toBe('#FF0000')
  })

  it('should apply custom chromatic styles', () => {
    const { container } = render(
      <Piano
        style={{
          chromatic: { fill: '#00FF00' },
        }}
      />,
    )
    const cs4 = container.querySelector('.diatonic-piano-key-Cs4')
    expect(cs4?.getAttribute('fill')).toBe('#00FF00')
  })

  it('should merge custom styles with default theme', () => {
    const { container } = render(
      <Piano
        style={{
          diatonic: { fill: '#FF0000' }, // override fill only
        }}
      />,
    )
    const c4 = container.querySelector('.diatonic-piano-key-C4')
    // Fill should be custom
    expect(c4?.getAttribute('fill')).toBe('#FF0000')
    // Stroke should be default
    expect(c4?.getAttribute('stroke')).toBe(THEMES!.default!.chromatic!.stroke)
  })

  it('should display aria-label with pressed notes', () => {
    const { container } = render(<Piano pressed={['C4', 'E4']} />)
    const svg = container.querySelector('svg')
    const ariaLabel = svg?.getAttribute('aria-label')
    expect(ariaLabel).toContain('Piano:')
  })

  it('should have description with pressed notes', () => {
    render(<Piano pressed={['C4', 'E4']} />)
    expect(screen.getByText(/Pressed keys:/)).toBeTruthy()
  })

  describe('keyboard shortcuts', () => {
    it('should call onClick when keyboard shortcut is pressed', () => {
      const onClick = vi.fn()
      render(<Piano keyboardShortcuts={true} onClick={onClick} />)

      // Simulate keydown event with keyCode for 'A' key (65)
      const event = new KeyboardEvent('keydown', {
        keyCode: 65,
      } as KeyboardEventInit)
      document.dispatchEvent(event)

      expect(onClick).toHaveBeenCalledWith('C4')
    })

    it('should transpose note when shift is pressed', () => {
      const onClick = vi.fn()
      render(<Piano keyboardShortcuts={true} onClick={onClick} />)

      // Simulate keydown event with shift key
      const event = new KeyboardEvent('keydown', {
        keyCode: 65,
        shiftKey: true,
      } as KeyboardEventInit)
      document.dispatchEvent(event)

      expect(onClick).toHaveBeenCalledWith('C#4')
    })

    it('should not respond to keyboard when keyboardShortcuts is false', () => {
      const onClick = vi.fn()
      render(<Piano keyboardShortcuts={false} onClick={onClick} />)

      const event = new KeyboardEvent('keydown', {
        keyCode: 65,
      } as KeyboardEventInit)
      document.dispatchEvent(event)

      expect(onClick).not.toHaveBeenCalled()
    })
  })

  describe('octave centering', () => {
    it('should center around octave 4 for 1 octave', () => {
      const { container } = render(<Piano octaves={1} />)
      expect(container.querySelector('.diatonic-piano-octave-4')).toBeTruthy()
    })

    it('should center around octave 4 for 2 octaves', () => {
      const { container } = render(<Piano octaves={2} />)
      // 2 octaves: firstOctave = 4 - floor((2-1)/2) = 4 - 0 = 4, so octaves 4 and 5
      expect(container.querySelector('.diatonic-piano-octave-4')).toBeTruthy()
      expect(container.querySelector('.diatonic-piano-octave-5')).toBeTruthy()
    })

    it('should center around octave 4 for 3 octaves', () => {
      const { container } = render(<Piano octaves={3} />)
      // 3 octaves: firstOctave = 4 - floor((3-1)/2) = 4 - 1 = 3, so octaves 3, 4, and 5
      expect(container.querySelector('.diatonic-piano-octave-3')).toBeTruthy()
      expect(container.querySelector('.diatonic-piano-octave-4')).toBeTruthy()
      expect(container.querySelector('.diatonic-piano-octave-5')).toBeTruthy()
    })
  })
})
