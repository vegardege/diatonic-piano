import { Note, type NoteList } from 'kamasi'
import {
  CHROMATIC_KEY_WIDTH,
  DIATONIC_KEY_WIDTH,
  KEY_STROKE_WIDTH,
} from './constants.js'
import { Key } from './Key.js'

/**
 * Props for the Octave component.
 */
export interface OctaveProps {
  octaveNum: number
  pressed: NoteList
  highlighted: NoteList
  focusable: boolean
  onClick: (note: string) => void
  onPointerEnter: (note: string) => void
  onPointerLeave: (note: string) => void
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
    const diatonicPos = DIATONIC_KEY_WIDTH * pitchClass.diatonicOffset
    const chromatcPos = isChromatic
      ? DIATONIC_KEY_WIDTH - CHROMATIC_KEY_WIDTH / 2
      : 0

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
          onPointerEnter={props.onPointerEnter}
          onPointerLeave={props.onPointerLeave}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
        />
      </g>
    )
  })

  return (
    <g
      className={`diatonic-piano-octave-${props.octaveNum}`}
      transform={`translate(${KEY_STROKE_WIDTH / 2}
                            ${KEY_STROKE_WIDTH / 2})`}
    >
      {keys}
    </g>
  )
}
