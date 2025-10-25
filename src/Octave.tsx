import { Note, type NoteList } from 'kamasi'
import { Key } from './Key.js'
import type { Theme } from './themes.js'

/**
 * Props for the Octave component.
 */
export interface OctaveProps {
  octaveNum: number
  pressed: NoteList
  highlighted: NoteList
  style: Theme
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
    const diatonicPos = props.style.diatonic.width * pitchClass.diatonicOffset
    const chromatcPos = isChromatic
      ? props.style.diatonic.width - props.style.chromatic.width / 2
      : 0

    const style = isChromatic ? props.style.chromatic : props.style.diatonic

    return (
      <g
        key={pitchClass.toString()}
        transform={`translate(${diatonicPos + chromatcPos})`}
      >
        <Key
          note={pitch}
          style={style}
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
      className={`diatonic-octave-${props.octaveNum}`}
      transform={`translate(${props.style.diatonic.strokeWidth / 2}
                             ${props.style.diatonic.strokeWidth / 2})`}
    >
      {keys}
    </g>
  )
}
