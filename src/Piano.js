import React from 'react'
import PropTypes from 'prop-types'
import { NoteList } from 'kamasi'
import { Octave } from './Octave.js'
import { THEMES } from './themes.js'

export function Piano(props) {
  
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
              onClick={props.onClick}
              onMouseEnter={props.onMouseEnter}
              onMouseLeave={props.onMouseLeave} />
    </g>
  })

  return (
    <svg xmlns="http://www.w3.org/2000/svg"
         preserveAspectRatio="xMinYMin meet"
         className="diatonic-piano"
         viewBox={viewBox}
         width={props.width}
         height={props.height}>
           {octaves}
    </svg>
  )
}

Piano.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  octaves: PropTypes.number,
  pressed: PropTypes.any,
  highlighted: PropTypes.any,
  style: PropTypes.object,
  theme: PropTypes.string,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
}

Piano.defaultProps = {
  width: '100%',
  height: '100%',
  octaves: 2,
  theme: 'default',
  onClick: () => undefined,
  onMouseEnter: () => undefined,
  onMouseLeave: () => undefined,
}

function ensureType(object, cls) {
  return object instanceof cls ? object
                               : new cls(object)
}
