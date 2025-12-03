import type { Note } from 'kamasi'

/**
 * Props for the Key component.
 */
export interface KeyProps {
  note: Note
  isPressed: boolean
  isHighlighted: boolean
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
 * All styling is controlled via CSS using data attributes and CSS variables.
 */
export function Key(props: KeyProps) {
  // Derive whether this is a chromatic (black) key from the note
  const isChromatic = props.note.accidentals.length > 0

  // Default dimensions (these will be overridden by CSS)
  const width = isChromatic ? 50 : 100
  const height = isChromatic ? 200 : 400
  const rx = 10

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
      data-pressed={props.isPressed}
      data-highlighted={props.isHighlighted}
      data-key-type={isChromatic ? 'chromatic' : 'diatonic'}
      d={`M0 0
          l0 ${height - rx}
          c0 0 0 ${rx} ${rx} ${rx}
          l${width - 2 * rx} 0
          c0 0 ${rx} 0 ${rx} -${rx}
          l0 -${height - rx}
          Z`}
      style={{ outline: 'none' }}
      tabIndex={calculatedTabIndex}
      onKeyDown={
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
