import type { Note } from 'kamasi'
import type { KeyStyle } from './themes.js'

/**
 * Props for the Key component.
 */
export interface KeyProps {
  note: Note
  isPressed: boolean
  isHighlighted: boolean
  style: KeyStyle
  focusable: boolean
  onClick: (note: string) => void
  onMouseEnter: (note: string) => void
  onMouseLeave: (note: string) => void
  onFocus: (note: string) => void
  onBlur: (note: string) => void
}

/**
 * A key is either a white key (diatonic) or a black key (chromatic).
 *
 * It is uniquely definied by a note, which contains the note letter,
 * accidentals, and an octave number.
 *
 * This component draws the key as an SVG <path> element.
 */
export function Key(props: KeyProps) {
  const color = props.isPressed
    ? props.style.pressed
    : props.isHighlighted
      ? props.style.highlighted
      : props.style.fill

  const width = props.style.width,
    height = props.style.height,
    rx = Math.min(props.style.rx, props.style.width / 2)

  // Calculate tab index for left-to-right navigation across octaves
  // Add offset of 24 (2 octaves) to handle negative octave numbers gracefully
  const pitchClass = props.note.toPitchClass().toString()
  const calculatedTabIndex = props.focusable
    ? (props.note.octave + 2) * 12 + props.note.chromaticOffset
    : -1

  return (
    <path
      role="button"
      className={`diatonic-piano-key
                  diatonic-piano-key-${props.note.toString().replace('#', 's')}
                  diatonic-piano-key-${pitchClass.replace('#', 's')}`}
      d={`M0 0
          l0 ${height - rx}
          c0 0 0 ${rx} ${rx} ${rx}
          l${width - 2 * rx} 0
          c0 0 ${rx} 0 ${rx} -${rx}
          l0 -${height - rx}
          Z`}
      fill={color}
      stroke={props.style.stroke}
      strokeWidth={props.style.strokeWidth}
      style={{ outline: 'none' }}
      tabIndex={calculatedTabIndex}
      onKeyPress={
        props.focusable
          ? e => {
              e.key === 'Enter'
                ? props.onClick(props.note.toString())
                : undefined
            }
          : undefined
      }
      onClick={() => props.onClick(props.note.toString())}
      onMouseEnter={() => props.onMouseEnter(props.note.toString())}
      onMouseLeave={() => props.onMouseLeave(props.note.toString())}
      onFocus={() => props.onFocus(props.note.toString())}
      onBlur={() => props.onBlur(props.note.toString())}
    />
  )
}
