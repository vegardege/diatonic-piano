import React from 'react'
import PropTypes from 'prop-types'

export function DiatonicKey(props) {

  const color = props.isPressed ? props.style.pressedColor
              : props.isHighlighted ? props.style.highlightedColor
              : '#fff'

  return <path className={`diatonic-key-${props.note}
                           diatonic-key-${props.note}${props.octaveNum}`}
               d={`M0 0 l0 390 c0 0 0 10 10 10 l80 0 c0 0 10 0 10 -10 l0 -390 Z`}
               fill={color}
               stroke='#000'
               strokeWidth={props.style.strokeWidth} />
}

DiatonicKey.propTypes = {
  note: PropTypes.string.isRequired,
  octaveNum: PropTypes.number.isRequired,
  isPressed: PropTypes.bool,
  isHighlighted: PropTypes.bool,
  style: PropTypes.object,
}
