import React from 'react'
import PropTypes from 'prop-types'

export function ChromaticKey(props) {
  return <path className={`diatonic-key-${props.note}s
                           diatonic-key-${props.note}s${props.octaveNum}`}
               d={`M0 0 l0 190 c0 0 0 10 10 10 l30 0 c0 0 10 0 10 -10 l0 -190 Z`}
               fill='#000'
               stroke='#000'
               strokeWidth={props.strokeWidth} />
}

ChromaticKey.propTypes = {
  note: PropTypes.string.isRequired,
  octaveNum: PropTypes.number.isRequired,
  strokeWidth: PropTypes.number.isRequired,
}
