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
    interactive: false,
    onPress: vi.fn(),
    onHighlightStart: vi.fn(),
    onHighlightEnd: vi.fn(),
  }

  it('should render a path element', () => {
    const { container } = render(
      <svg>
        <Key {...defaultProps} />
      </svg>,
    )
    expect(container.querySelector('path')).toBeTruthy()
  })

  it('should have role="presentation" when not interactive', () => {
    const { container } = render(
      <svg>
        <Key {...defaultProps} />
      </svg>,
    )
    const path = container.querySelector('path')
    expect(path?.getAttribute('role')).toBe('presentation')
  })

  it('should have role="button" when interactive', () => {
    const { container } = render(
      <svg>
        <Key {...defaultProps} interactive={true} />
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

  it('should have tabIndex -1 when not interactive', () => {
    const { container } = render(
      <svg>
        <Key {...defaultProps} interactive={false} />
      </svg>,
    )
    const path = container.querySelector('path')
    expect(path?.tabIndex).toBe(-1)
  })

  it('should have positive tabIndex when interactive', () => {
    const { container } = render(
      <svg>
        <Key {...defaultProps} interactive={true} />
      </svg>,
    )
    const path = container.querySelector('path')
    // C4 should have tabIndex 72 = (4+2)*12 + 0
    expect(path?.tabIndex).toBeGreaterThan(0)
  })

  it('should call onPress when clicked', async () => {
    const user = userEvent.setup()
    const onPress = vi.fn()
    const { container } = render(
      <svg>
        <Key {...defaultProps} interactive={true} onPress={onPress} />
      </svg>,
    )
    const path = container.querySelector('path')
    if (path) {
      await user.click(path)
      expect(onPress).toHaveBeenCalledTimes(1)
      expect(onPress.mock.calls[0]![0]).toBe('C4')
      expect(onPress.mock.calls[0]![1]).toBeInstanceOf(MouseEvent)
    }
  })

  it('should call onHighlightStart when pointer enters', async () => {
    const user = userEvent.setup()
    const onHighlightStart = vi.fn()
    const { container } = render(
      <svg>
        <Key
          {...defaultProps}
          interactive={true}
          onHighlightStart={onHighlightStart}
        />
      </svg>,
    )
    const path = container.querySelector('path')
    if (path) {
      await user.hover(path)
      expect(onHighlightStart).toHaveBeenCalledTimes(1)
      expect(onHighlightStart.mock.calls[0]![0]).toBe('C4')
      expect(onHighlightStart.mock.calls[0]![1]).toBeInstanceOf(PointerEvent)
    }
  })

  it('should call onHighlightStart when focused', async () => {
    const user = userEvent.setup()
    const onHighlightStart = vi.fn()
    const { container } = render(
      <svg>
        <Key
          {...defaultProps}
          interactive={true}
          onHighlightStart={onHighlightStart}
        />
      </svg>,
    )
    const path = container.querySelector('path')
    if (path) {
      await user.tab()
      expect(onHighlightStart).toHaveBeenCalledTimes(1)
      expect(onHighlightStart.mock.calls[0]![0]).toBe('C4')
      expect(onHighlightStart.mock.calls[0]![1]).toBeInstanceOf(FocusEvent)
    }
  })

  it('should call onPress when Enter is pressed and interactive', async () => {
    const user = userEvent.setup()
    const onPress = vi.fn()
    const { container } = render(
      <svg>
        <Key {...defaultProps} interactive={true} onPress={onPress} />
      </svg>,
    )
    const path = container.querySelector('path')
    if (path) {
      path.focus()
      await user.keyboard('{Enter}')
      expect(onPress).toHaveBeenCalledTimes(1)
      expect(onPress.mock.calls[0]![0]).toBe('C4')
      expect(onPress.mock.calls[0]![1]).toBeInstanceOf(KeyboardEvent)
    }
  })

  it('should not call onPress when other keys are pressed', async () => {
    const user = userEvent.setup()
    const onPress = vi.fn()
    const { container } = render(
      <svg>
        <Key {...defaultProps} interactive={true} onPress={onPress} />
      </svg>,
    )
    const path = container.querySelector('path')
    if (path) {
      path.focus()
      await user.keyboard('a')
      expect(onPress).not.toHaveBeenCalled()
    }
  })

  it('should not call handlers when not interactive', async () => {
    const user = userEvent.setup()
    const onPress = vi.fn()
    const onHighlightStart = vi.fn()
    const { container } = render(
      <svg>
        <Key
          {...defaultProps}
          interactive={false}
          onPress={onPress}
          onHighlightStart={onHighlightStart}
        />
      </svg>,
    )
    const path = container.querySelector('path')
    if (path) {
      await user.click(path)
      await user.hover(path)
      expect(onPress).not.toHaveBeenCalled()
      expect(onHighlightStart).not.toHaveBeenCalled()
    }
  })
})
