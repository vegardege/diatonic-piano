import { render } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { Note } from 'kamasi'
import { describe, expect, it, vi } from 'vitest'
import { Key } from './Key.js'
import { THEMES } from './themes.js'

describe('Key', () => {
  const defaultProps = {
    note: new Note('C', '').toPitch(4),
    isPressed: false,
    isHighlighted: false,
    style: THEMES.default!.diatonic,
    focusable: false,
    onClick: vi.fn(),
    onMouseEnter: vi.fn(),
    onMouseLeave: vi.fn(),
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

  it('should use fill color when not pressed or highlighted', () => {
    const { container } = render(
      <svg>
        <Key {...defaultProps} />
      </svg>,
    )
    const path = container.querySelector('path')
    expect(path?.getAttribute('fill')).toBe(THEMES.default!.diatonic!.fill)
  })

  it('should use pressed color when pressed', () => {
    const { container } = render(
      <svg>
        <Key {...defaultProps} isPressed={true} />
      </svg>,
    )
    const path = container.querySelector('path')
    expect(path?.getAttribute('fill')).toBe(THEMES.default!.diatonic!.pressed)
  })

  it('should use highlighted color when highlighted', () => {
    const { container } = render(
      <svg>
        <Key {...defaultProps} isHighlighted={true} />
      </svg>,
    )
    const path = container.querySelector('path')
    expect(path?.getAttribute('fill')).toBe(
      THEMES.default!.diatonic!.highlighted,
    )
  })

  it('should prefer pressed over highlighted', () => {
    const { container } = render(
      <svg>
        <Key {...defaultProps} isPressed={true} isHighlighted={true} />
      </svg>,
    )
    const path = container.querySelector('path')
    expect(path?.getAttribute('fill')).toBe(THEMES.default!.diatonic!.pressed)
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

  it('should have tabIndex 0 when focusable', () => {
    const { container } = render(
      <svg>
        <Key {...defaultProps} focusable={true} />
      </svg>,
    )
    const path = container.querySelector('path')
    expect(path?.tabIndex).toBe(0)
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

  it('should call onMouseEnter when mouse enters', async () => {
    const user = userEvent.setup()
    const onMouseEnter = vi.fn()
    const { container } = render(
      <svg>
        <Key {...defaultProps} onMouseEnter={onMouseEnter} />
      </svg>,
    )
    const path = container.querySelector('path')
    if (path) {
      await user.hover(path)
      expect(onMouseEnter).toHaveBeenCalledWith('C4')
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
