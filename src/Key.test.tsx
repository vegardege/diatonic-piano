import { render } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { Note } from 'kamasi'
import { describe, expect, it, vi } from 'vitest'
import { Key } from './Key.js'

describe('Key', () => {
  const defaultProps = {
    note: new Note('C', '').toPitch(4),
    isPressed: false,
    isHighlighted: false,
    focusable: false,
    onClick: vi.fn(),
    onPointerEnter: vi.fn(),
    onPointerLeave: vi.fn(),
    onFocus: vi.fn(),
    onBlur: vi.fn(),
  }

  it('should render a path element', () => {
    const { container } = render(
      <svg>
        <Key {...defaultProps} />
      </svg>,
    )
    expect(container.querySelector('path')).toBeTruthy()
  })

  it('should have role="button"', () => {
    const { container } = render(
      <svg>
        <Key {...defaultProps} />
      </svg>,
    )
    const path = container.querySelector('path')
    expect(path?.getAttribute('role')).toBe('button')
  })

  it('should apply correct class names', () => {
    const { container } = render(
      <svg>
        <Key {...defaultProps} />
      </svg>,
    )
    const path = container.querySelector('path')
    expect(path?.getAttribute('class')).toContain('diatonic-piano-key')
    expect(path?.getAttribute('class')).toContain('diatonic-piano-key-C')
    expect(path?.getAttribute('class')).toContain('diatonic-piano-key-C4')
  })

  it('should replace # with s in class names', () => {
    const sharpNote = new Note('C', '#').toPitch(4)
    const { container } = render(
      <svg>
        <Key {...defaultProps} note={sharpNote} />
      </svg>,
    )
    const path = container.querySelector('path')
    expect(path?.getAttribute('class')).toContain('diatonic-piano-key-Cs')
    expect(path?.getAttribute('class')).toContain('diatonic-piano-key-Cs4')
  })

  it('should have data-pressed="false" when not pressed', () => {
    const { container } = render(
      <svg>
        <Key {...defaultProps} />
      </svg>,
    )
    const path = container.querySelector('path')
    expect(path?.getAttribute('data-pressed')).toBe('false')
  })

  it('should have data-pressed="true" when pressed', () => {
    const { container } = render(
      <svg>
        <Key {...defaultProps} isPressed={true} />
      </svg>,
    )
    const path = container.querySelector('path')
    expect(path?.getAttribute('data-pressed')).toBe('true')
  })

  it('should have data-highlighted="true" when highlighted', () => {
    const { container } = render(
      <svg>
        <Key {...defaultProps} isHighlighted={true} />
      </svg>,
    )
    const path = container.querySelector('path')
    expect(path?.getAttribute('data-highlighted')).toBe('true')
  })

  it('should have data-key-type="diatonic" for white keys', () => {
    const { container } = render(
      <svg>
        <Key {...defaultProps} />
      </svg>,
    )
    const path = container.querySelector('path')
    expect(path?.getAttribute('data-key-type')).toBe('diatonic')
  })

  it('should have data-key-type="chromatic" for black keys', () => {
    const sharpNote = new Note('C', '#').toPitch(4)
    const { container } = render(
      <svg>
        <Key {...defaultProps} note={sharpNote} />
      </svg>,
    )
    const path = container.querySelector('path')
    expect(path?.getAttribute('data-key-type')).toBe('chromatic')
  })

  it('should have tabIndex -1 when not focusable', () => {
    const { container } = render(
      <svg>
        <Key {...defaultProps} focusable={false} />
      </svg>,
    )
    const path = container.querySelector('path')
    expect(path?.tabIndex).toBe(-1)
  })

  it('should have positive tabIndex when focusable', () => {
    const { container } = render(
      <svg>
        <Key {...defaultProps} focusable={true} />
      </svg>,
    )
    const path = container.querySelector('path')
    // C4 should have tabIndex 72 = (4+2)*12 + 0
    expect(path?.tabIndex).toBeGreaterThan(0)
  })

  it('should call onClick when clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    const { container } = render(
      <svg>
        <Key {...defaultProps} onClick={onClick} />
      </svg>,
    )
    const path = container.querySelector('path')
    if (path) {
      await user.click(path)
      expect(onClick).toHaveBeenCalledWith('C4')
    }
  })

  it('should call onPointerEnter when pointer enters', async () => {
    const user = userEvent.setup()
    const onPointerEnter = vi.fn()
    const { container } = render(
      <svg>
        <Key {...defaultProps} onPointerEnter={onPointerEnter} />
      </svg>,
    )
    const path = container.querySelector('path')
    if (path) {
      await user.hover(path)
      expect(onPointerEnter).toHaveBeenCalledWith('C4')
    }
  })

  it('should call onFocus when focused', async () => {
    const user = userEvent.setup()
    const onFocus = vi.fn()
    const { container } = render(
      <svg>
        <Key {...defaultProps} focusable={true} onFocus={onFocus} />
      </svg>,
    )
    const path = container.querySelector('path')
    if (path) {
      await user.tab()
      expect(onFocus).toHaveBeenCalledWith('C4')
    }
  })

  it('should call onClick when Enter is pressed and focusable', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    const { container } = render(
      <svg>
        <Key {...defaultProps} focusable={true} onClick={onClick} />
      </svg>,
    )
    const path = container.querySelector('path')
    if (path) {
      path.focus()
      await user.keyboard('{Enter}')
      expect(onClick).toHaveBeenCalledWith('C4')
    }
  })

  it('should not call onClick when other keys are pressed', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    const { container } = render(
      <svg>
        <Key {...defaultProps} focusable={true} onClick={onClick} />
      </svg>,
    )
    const path = container.querySelector('path')
    if (path) {
      path.focus()
      await user.keyboard('a')
      expect(onClick).not.toHaveBeenCalled()
    }
  })
})
