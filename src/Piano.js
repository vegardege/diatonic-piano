import React from 'react'
import PropTypes from 'prop-types'
import { NoteList } from 'kamasi'
import { Octave } from './Octave.js'

export function Piano(props) {

  // Center around octave number 4
  const octaveCount = +props.octaves,
        firstOctave = 4 - Math.floor((octaveCount - 1) / 2)
  
  // Style can be overwritten by the prop
  const style = {
    strokeWidth: props.style?.strokeWidth || 4,
    pressedColor: props.style?.pressedColor || '#E84855',
    highlightedColor: props.style?.highlightedColor || '#F2929A',
  }

  // The SVG element fills its container unless otherwise specified
  // Viewbox is set to 700x400 to give us round numbers in each octave
  // viewBox must add the stroke width to prevent clipping on edges
  const viewBoxWidth = 700,
        viewBoxHeight = 400,
        viewBox = `0 0 ${viewBoxWidth * octaveCount + style.strokeWidth}
                       ${viewBoxHeight + style.strokeWidth}`

  // Create kamasi note lists to help us compare enharmonic notes
  const pressed = ensureType(props.pressed, NoteList),
        highlighted = ensureType(props.highlighted, NoteList)

  const octaves = [...Array(octaveCount).keys()].map(octaveNum => {
    return <g key={octaveNum}
       transform={`translate(${700 * octaveNum})`}>
      <Octave octaveNum={firstOctave + octaveNum}
              pressed={pressed}
              highlighted={highlighted}
              style={style} />
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
}

Piano.defaultProps = {
  width: '100%',
  height: '100%',
  octaves: 2,
}

function ensureType(object, cls) {
  return object instanceof cls ? object
                               : new cls(object)
}
