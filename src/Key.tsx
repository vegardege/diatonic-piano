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
 * Dimensions used to determine the relative size of the key.
 * Note that the key will scale to fit its surrounding container.
 */
const DIATONIC_KEY_WIDTH = 100
const DIATONIC_KEY_HEIGHT = 400
const CHROMATIC_KEY_WIDTH = 50
const CHROMATIC_KEY_HEIGHT = 200
const KEY_BORDER_RADIUS = 10

/**
 * Default color scheme for piano keys.
 * These serve as fallback presentation attributes when styles.css is not imported.
 * CSS rules can override these values (CSS has higher specificity than SVG attributes).
 */
const DEFAULT_THEME = {
  diatonic: {
    default: { fill: '#f7f5f0', stroke: '#c0b8b0' },
    highlighted: { fill: '#eca088', stroke: '#b8624c' },
    pressed: { fill: '#e07858', stroke: '#3d3530' },
  },
  chromatic: {
    default: { fill: '#4a423c', stroke: '#4a423c' },
    highlighted: { fill: '#b86850', stroke: '#503028' },
    pressed: { fill: '#c04838', stroke: '#2d2520' },
  },
  strokeWidth: 2,
}

/**
 * A key is either a white key (diatonic) or a black key (chromatic).
 *
 * It is uniquely definied by a note, which contains the note letter,
 * accidentals, and an octave number.
 *
 * This component draws the key as an SVG <path> element with default
 * presentation attributes (fill, stroke, strokeWidth) that provide sensible
 * styling out-of-the-box. These defaults can be overridden with CSS using
 * data attributes and CSS variables.
 */
export function Key(props: KeyProps) {
  // Derive whether this is a chromatic (black) key from the note
  const isChromatic = props.note.accidentals.length > 0

  // Relative dimensions
  const width = isChromatic ? CHROMATIC_KEY_WIDTH : DIATONIC_KEY_WIDTH
  const height = isChromatic ? CHROMATIC_KEY_HEIGHT : DIATONIC_KEY_HEIGHT
  const rx = KEY_BORDER_RADIUS

  // Calculate tab index for left-to-right navigation across octaves
  // Add offset of 24 (2 octaves) to handle negative octave numbers gracefully
  const pitchClass = props.note.toPitchClass().toString()
  const calculatedTabIndex = props.focusable
    ? (props.note.octave + 2) * 12 + props.note.chromaticOffset
    : -1

  // Determine colors based on state and key type
  // These are set as SVG presentation attributes (lowest specificity)
  // CSS rules can override them, so styles.css takes precedence when imported
  const keyType = isChromatic ? 'chromatic' : 'diatonic'
  const state = props.isPressed
    ? 'pressed'
    : props.isHighlighted
      ? 'highlighted'
      : 'default'
  const colors = DEFAULT_THEME[keyType][state]
  const cursor = props.focusable ? 'pointer' : 'auto'

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
      fill={colors.fill}
      stroke={colors.stroke}
      strokeWidth={DEFAULT_THEME.strokeWidth}
      style={{ outline: 'none', cursor: cursor }}
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
