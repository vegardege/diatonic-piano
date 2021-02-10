import React from 'react'
import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { NoteList } from 'kamasi'
import { Octave } from './Octave.js'
import { THEMES } from './themes.js'

export function Piano(props) {

  if (props.keyboardShortcuts) {
    useEffect(() => {
      document.addEventListener('keydown', handleKeyDown)

      return () => {
        document.removeEventListener('keydown', handleKeyDown)
      }
    })
  }

  function handleKeyDown(e) {
    const note = {
      65: 'C4', 87: 'C#4', 83: 'D4', 69: 'D#4', 68: 'E4', 70: 'F4',
      84: 'F#4', 71: 'G4', 89: 'G#4', 72: 'A4', 85: 'A#4', 74: 'B4',
    }[e.keyCode]
    if (note !== undefined) {
      props.onClick(note)
    }
  }

  // Theme is overwritten by any style specified
  const theme = THEMES[props.theme] || THEMES['default']
  const style = {
    diatonic: {...theme.diatonic, ...props?.style?.diatonic},
    chromatic: {...theme.chromatic, ...props?.style?.chromatic},
  }

  // Center around octave number 4
  const octaveCount = +props.octaves,
        firstOctave = 4 - Math.floor((octaveCount - 1) / 2)

  // The SVG element fills its container unless otherwise specified
  // ViewBox must add the stroke width to prevent clipping on edges
  const viewBoxWidth = 7 * octaveCount * style.diatonic.width,
        viewBoxHeight = style.diatonic.height,
        viewBox = `0 0 ${viewBoxWidth + style.diatonic.strokeWidth}
                       ${viewBoxHeight + style.diatonic.strokeWidth}`

  // Create kamasi note lists to help us compare enharmonic notes
  const pressed = ensureType(props.pressed, NoteList),
        highlighted = ensureType(props.highlighted, NoteList)

  const octaves = [...Array(octaveCount).keys()].map(octaveNum => {
    return <g key={octaveNum}
       transform={`translate(${7 * style.diatonic.width * octaveNum})`}>
      <Octave octaveNum={firstOctave + octaveNum}
              pressed={pressed}
              highlighted={highlighted}
              style={style}
              focusable={props.focusable}
              onClick={props.onClick}
              onMouseEnter={props.onMouseEnter}
              onMouseLeave={props.onMouseLeave} />
    </g>
  })

  return (
    <svg xmlns="http://www.w3.org/2000/svg"
         preserveAspectRatio={props.preserveAspectRatio}
         className="diatonic-piano"
         role="img"
         aria-label={`Piano: ${pressed.toString()}`}
         viewBox={viewBox}
         width={props.width}
         height={props.height}>
           <title>Piano</title>
           <desc>Pressed keys: {pressed.toString()}</desc>
           {octaves}
    </svg>
  )
}

Piano.propTypes = {
  preserveAspectRatio: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  octaves: PropTypes.number,
  pressed: PropTypes.any,
  highlighted: PropTypes.any,
  style: PropTypes.object,
  theme: PropTypes.string,
  keyboardShortcuts: PropTypes.bool,
  focusable: PropTypes.bool,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
}

Piano.defaultProps = {
  preserveAspectRatio: 'xMinYMin meet',
  width: '100%',
  height: '100%',
  octaves: 2,
  theme: 'default',
  pressed: [],
  highlighted: [],
  keyboardShortcuts: false,
  focusable: false,
  onClick: () => undefined,
  onMouseEnter: () => undefined,
  onMouseLeave: () => undefined,
}

function ensureType(object, cls) {
  return object instanceof Array ? new cls(object)
       : typeof object === "string" ? cls.fromString(object)
       : object
}
