import React from 'react'
import PropTypes from 'prop-types'

/**
 * A key is either a white key (diatonic) or a black key (chromatic).
 * 
 * It is uniquely definied by a note, which contains the note letter,
 * accidentals, and an octave number.
 * 
 * This component draws the key as an SVG <path> element.
 */
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
               tabIndex={props.focusable ? "0" : "-1"}
               onKeyPress={props.focusable ? e => {
                 e.key === 'Enter' ? props.onClick(props.note.toString()) : undefined
               } : undefined}
               onClick={() => props.onClick(props.note.toString())}
               onMouseEnter={() => props.onMouseEnter(props.note.toString())}
               onMouseLeave={() => props.onMouseLeave(props.note.toString())}
               onFocus={() => props.onFocus(props.note.toString())}
               onBlur={() => props.onBlur(props.note.toString())}
          />
}

Key.propTypes = {
  note: PropTypes.object.isRequired,

  isPressed: PropTypes.bool.isRequired,
  isHighlighted: PropTypes.bool.isRequired,

  style: PropTypes.object.isRequired,

  focusable: PropTypes.bool.isRequired,

  onClick: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
}
