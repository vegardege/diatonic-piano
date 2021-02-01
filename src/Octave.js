import React from 'react'
import PropTypes from 'prop-types'
import { Note } from 'kamasi'
import { DiatonicKey } from './DiatonicKey.js'
import { ChromaticKey } from './ChromaticKey.js'

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

    return <g key={pitchClass.toString()}
               transform={`translate(${100 * ix})`}>
      <DiatonicKey note={pitch}
                   style={props.style}
                   isPressed={isPressed(pitch, pitchClass)}
                   isHighlighted={isHighlighted(pitch, pitchClass)}
                   onClick={props.onClick}
                   onMouseEnter={props.onMouseEnter}
                   onMouseLeave={props.onMouseLeave} />
    </g>
  })
  const chromaticKeys = chromatic.map((pitchClass, ix) => {

    // Skip non-existing chromatic keys
    if (!pitchClass) return undefined

    const pitch = pitchClass.toPitch(props.octaveNum)

    return <g key={pitchClass.toString()}
              transform={`translate(${100 * ix + 75})`}>
      <ChromaticKey note={pitch}
                    style={props.style}
                    isPressed={isPressed(pitch, pitchClass)}
                    isHighlighted={isHighlighted(pitch, pitchClass)}
                    onClick={props.onClick}
                    onMouseEnter={props.onMouseEnter}
                    onMouseLeave={props.onMouseLeave} />
    </g>
  })

  return (
    <g className={`diatonic-octave-${props.octaveNum}`}
       transform={`translate(${props.style.strokeWidth/2}
                             ${props.style.strokeWidth/2})`}>
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
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
}

Octave.defaultProps = {
  pressed: [],
  highlighted: [],
}
