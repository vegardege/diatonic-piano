import React from 'react'
import PropTypes from 'prop-types'

export function DiatonicKey(props) {

  const color = props.isPressed ? props.style.pressedColor
              : props.isHighlighted ? props.style.highlightedColor
              : '#fff'

  return <path className={`diatonic-key-${props.note.toString()}
                           diatonic-key-${props.note.toPitchClass().toString()}`}
               d={`M0 0 l0 390 c0 0 0 10 10 10 l80 0 c0 0 10 0 10 -10 l0 -390 Z`}
               fill={color}
               stroke='#000'
               strokeWidth={props.style.strokeWidth}
               onClick={() => props.onClick(props.note.toString())}
               onMouseEnter={() => props.onMouseEnter(props.note.toString())}
               onMouseLeave={() => props.onMouseLeave(props.note.toString())} />
}

DiatonicKey.propTypes = {
  note: PropTypes.object.isRequired,
  isPressed: PropTypes.bool,
  isHighlighted: PropTypes.bool,
  style: PropTypes.object,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
}
