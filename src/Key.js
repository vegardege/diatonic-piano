import React from 'react'
import PropTypes from 'prop-types'

export function Key(props) {

  const color = props.isPressed ? props.style.pressed
              : props.isHighlighted ? props.style.highlighted
              : props.style.fill

  const width = props.style.width,
        height = props.style.height,
        rx = Math.min(props.style.rx, props.style.width / 2)

  return <path className={`diatonic-key
                           diatonic-key-${props.note.toString().replace('#', 's')}
                           diatonic-key-${props.note.toPitchClass().toString().replace('#', 's')}`}
               d={`M0 0
                   l0 ${height - rx}
                   c0 0 0 ${rx} ${rx} ${rx}
                   l${width - 2*rx} 0
                   c0 0 ${rx} 0 ${rx} -${rx}
                   l0 -${height - rx}
                   Z`}
               fill={color}
               stroke={props.style.stroke}
               strokeWidth={props.style.strokeWidth}
               onClick={() => props.onClick(props.note.toString())}
               onMouseEnter={() => props.onMouseEnter(props.note.toString())}
               onMouseLeave={() => props.onMouseLeave(props.note.toString())} />
}

Key.propTypes = {
  note: PropTypes.object.isRequired,
  isPressed: PropTypes.bool,
  isHighlighted: PropTypes.bool,
  style: PropTypes.object,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
}
