import { Note, type NoteList } from 'kamasi'
import { Key } from './Key.js'

// Fixed dimensions (not configurable)
const DIATONIC_WIDTH = 100
const STROKE_WIDTH = 4

/**
 * Props for the Octave component.
 */
export interface OctaveProps {
  octaveNum: number
  pressed: NoteList
  highlighted: NoteList
  focusable: boolean
  onClick: (note: string) => void
  onMouseEnter: (note: string) => void
  onMouseLeave: (note: string) => void
  onFocus: (note: string) => void
  onBlur: (note: string) => void
}

/**
 * An octave is a collection of seven white keys (diatonic notes) and five
 * black keys (chromatic notes).
 *
 * It is uniquely definied by an octave number, which in turn defines the
 * frequencies produced by each key.
 *
 * This component draws an octave as an SVG <g> element.
 */
export function Octave(props: OctaveProps) {
  const notes = [
    'C',
    'D',
    'E',
    'F',
    'G',
    'A',
    'B',
    'C#',
    'D#',
    'F#',
    'G#',
    'A#',
  ].map(n => new Note(n[0] as string, n[1] || ''))

  const isPressed = (pitch: Note, pitchClass: Note) => {
    return (
      props.pressed.includes(pitch, true) ||
      props.pressed.includes(pitchClass, true)
    )
  }

  const isHighlighted = (pitch: Note, pitchClass: Note) => {
    return (
      props.highlighted.includes(pitch, true) ||
      props.highlighted.includes(pitchClass, true)
    )
  }

  const keys = notes.map(pitchClass => {
    const pitch = pitchClass.toPitch(props.octaveNum)

    const isChromatic = pitchClass.accidentals.length > 0
    const chromaticWidth = DIATONIC_WIDTH / 2 // Black keys are half the width of white keys
    const diatonicPos = DIATONIC_WIDTH * pitchClass.diatonicOffset
    const chromatcPos = isChromatic ? DIATONIC_WIDTH - chromaticWidth / 2 : 0

    return (
      <g
        key={pitchClass.toString()}
        transform={`translate(${diatonicPos + chromatcPos})`}
      >
        <Key
          note={pitch}
          focusable={props.focusable}
          isPressed={isPressed(pitch, pitchClass)}
          isHighlighted={isHighlighted(pitch, pitchClass)}
          onClick={props.onClick}
          onMouseEnter={props.onMouseEnter}
          onMouseLeave={props.onMouseLeave}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
        />
      </g>
    )
  })

  return (
    <g
      className={`diatonic-piano-octave-${props.octaveNum}`}
      transform={`translate(${STROKE_WIDTH / 2}
                            ${STROKE_WIDTH / 2})`}
    >
      {keys}
    </g>
  )
}
