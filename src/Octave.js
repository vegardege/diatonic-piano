import React from 'react'
import PropTypes from 'prop-types'
import { Note } from 'kamasi'
import { Key } from './Key.js'

export function Octave(props) {

  const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B',
                 'C#', 'D#', 'F#', 'G#', 'A#'].map(
    n => new Note(n[0], n[1])
  )

  const isPressed = (pitch, pitchClass) => {
    return props.pressed.includes(pitch, true)
        || props.pressed.includes(pitchClass, true)
  }

  const isHighlighted = (pitch, pitchClass) => {
    return props.highlighted.includes(pitch, true)
        || props.highlighted.includes(pitchClass, true)
  }

  const keys = notes.map(pitchClass => {

    const pitch = pitchClass.toPitch(props.octaveNum)

    const isChromatic = pitchClass.accidentals.length > 0
    const diatonicPos = props.style.diatonic.width * pitchClass.diatonicOffset
    const chromatcPos = isChromatic ?
      props.style.diatonic.width - (props.style.chromatic.width / 2) : 0

    const style = isChromatic ? props.style.chromatic : props.style.diatonic

    return <g key={pitchClass.toString()}
               transform={`translate(${diatonicPos + chromatcPos})`}>
      <Key note={pitch}
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

  })

  return (
    <g className={`diatonic-octave-${props.octaveNum}`}
       transform={`translate(${props.style.diatonic.strokeWidth/2}
                             ${props.style.diatonic.strokeWidth/2})`}>
      {keys}
    </g>
  )
}

Octave.propTypes = {
  octaveNum: PropTypes.number.isRequired,
  pressed: PropTypes.object,
  highlighted: PropTypes.object,
  style: PropTypes.object,
  focusable: PropTypes.bool,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
}

Octave.defaultProps = {
  pressed: [],
  highlighted: [],
}
