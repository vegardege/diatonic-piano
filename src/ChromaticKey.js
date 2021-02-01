import React from 'react'
import PropTypes from 'prop-types'

export function ChromaticKey(props) {

  const color = props.isPressed ? props.style.pressedColor
              : props.isHighlighted ? props.style.highlightedColor
              : '#000'

  return <path className={`diatonic-key-${props.note.toString().replace('#', 's')}
                           diatonic-key-${props.note.toPitchClass().toString().replace('#', 's')}`}
               d={`M0 0 l0 190 c0 0 0 10 10 10 l30 0 c0 0 10 0 10 -10 l0 -190 Z`}
               fill={color}
               stroke='#000'
               strokeWidth={props.style.strokeWidth}
               onClick={() => props.onClick(props.note.toString())}
               onMouseEnter={() => props.onMouseEnter(props.note.toString())}
               onMouseLeave={() => props.onMouseLeave(props.note.toString())} />
}

ChromaticKey.propTypes = {
  note: PropTypes.object.isRequired,
  isPressed: PropTypes.bool,
  isHighlighted: PropTypes.bool,
  style: PropTypes.object,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
}
