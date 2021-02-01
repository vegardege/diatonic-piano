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

  const diatonicKeys = diatonic.map((note, ix) => {
    return <g key={note.toString()}
               transform={`translate(${100 * ix})`}>
      <DiatonicKey note={note}
                   style={props.style}
                   isPressed={props.pressed.includes(note, true)}
                   isHighlighted={props.highlighted.includes(note, true)} />
    </g>
  })
  const chromaticKeys = chromatic.map((note, ix) => {

    // Skip non-existing chromatic keys
    if (!note) return undefined

    return <g key={note.toString()}
              transform={`translate(${100 * ix + 75})`}>
      <ChromaticKey note={note}
                    style={props.style}
                    isPressed={props.pressed.includes(note, true)}
                    isHighlighted={props.highlighted.includes(note, true)} />
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
}

Octave.defaultProps = {
  pressed: [],
  highlighted: [],
}
