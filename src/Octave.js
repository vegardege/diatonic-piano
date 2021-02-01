import React from 'react'
import PropTypes from 'prop-types'
import { DiatonicKey } from './DiatonicKey.js'
import { ChromaticKey } from './ChromaticKey.js'

export function Octave(props) {

  const diatonic = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
  const chromatic = ['C', 'D', '', 'F', 'G', 'A', '']

  const diatonicKeys = diatonic.map((note, ix) => {
    return <g key={note}
               transform={`translate(${100 * ix})`}>
      <DiatonicKey note={note}
                   octaveNum={props.octaveNum}
                   strokeWidth={props.strokeWidth}
                   isPressed={props.pressed.includes(note)}
                   isHighlighted={props.highlighted.includes(note)} />
    </g>
  })
  const chromaticKeys = chromatic.map((note, ix) => {

    // Skip non-existing chromatic keys
    if (!note) return undefined

    note = note + '#'

    return <g key={note}
              transform={`translate(${100 * ix + 75})`}>
      <ChromaticKey note={note}
                    octaveNum={props.octaveNum}
                    strokeWidth={props.strokeWidth}
                    isPressed={props.pressed.includes(note)}
                    isHighlighted={props.highlighted.includes(note)} />
    </g>
  })

  return (
    <g className={`diatonic-octave-${props.octaveNum}`}
       transform={`translate(${props.strokeWidth/2} ${props.strokeWidth/2})`}>
      {diatonicKeys}
      {chromaticKeys}
    </g>
  )
}

Octave.propTypes = {
  octaveNum: PropTypes.number.isRequired,
  strokeWidth: PropTypes.number.isRequired,
  pressed: PropTypes.Array,
  highlighted: PropTypes.Array,
}

Octave.defaultProps = {
  pressed: [],
  highlighted: [],
}
