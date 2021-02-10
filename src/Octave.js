import React from 'react'
import PropTypes from 'prop-types'
import { Note } from 'kamasi'
import { Key } from './Key.js'

export function Octave(props) {

  const diatonic = ['C', 'D', 'E', 'F', 'G', 'A', 'B'].map(
    n => new Note(n)
  )
  const chromatic = ['C', 'D', '', 'F', 'G', 'A', ''].map(
    n => n ? new Note(n, '#') : ''
  )

  const isPressed = (pitch, pitchClass) => {
    return props.pressed.includes(pitch, true)
        || props.pressed.includes(pitchClass, true)
  }

  const isHighlighted = (pitch, pitchClass) => {
    return props.highlighted.includes(pitch, true)
        || props.highlighted.includes(pitchClass, true)
  }

  const diatonicKeys = diatonic.map((pitchClass, ix) => {

    const pitch = pitchClass.toPitch(props.octaveNum)
    const offset = props.style.diatonic.width * ix

    return <g key={pitchClass.toString()}
               transform={`translate(${offset})`}>
      <Key note={pitch}
           style={props.style.diatonic}
           focusable={props.focusable}
           isPressed={isPressed(pitch, pitchClass)}
           isHighlighted={isHighlighted(pitch, pitchClass)}
           onClick={props.onClick}
           onMouseEnter={props.onMouseEnter}
           onMouseLeave={props.onMouseLeave}
      />
    </g>
  })
  const chromaticKeys = chromatic.map((pitchClass, ix) => {

    // Skip non-existing chromatic keys
    if (!pitchClass) return undefined

    const pitch = pitchClass.toPitch(props.octaveNum)
    const offset = (props.style.diatonic.width * (ix + 1)
                  - props.style.chromatic.width / 2)

    return <g key={pitchClass.toString()}
              transform={`translate(${offset})`}>
      <Key note={pitch}
           style={props.style.chromatic}
           focusable={props.focusable}
           isPressed={isPressed(pitch, pitchClass)}
           isHighlighted={isHighlighted(pitch, pitchClass)}
           onClick={props.onClick}
           onMouseEnter={props.onMouseEnter}
           onMouseLeave={props.onMouseLeave}
      />
    </g>
  })

  return (
    <g className={`diatonic-octave-${props.octaveNum}`}
       transform={`translate(${props.style.diatonic.strokeWidth/2}
                             ${props.style.diatonic.strokeWidth/2})`}>
      {diatonicKeys}
      {chromaticKeys}
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
}

Octave.defaultProps = {
  pressed: [],
  highlighted: [],
}
