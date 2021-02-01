import React from 'react'
import PropTypes from 'prop-types'
import { Octave } from './Octave.js'

export function Piano(props) {

  // The SVG element fills its container unless otherwise specified
  // Viewbox is set to 700x400 to give us round numbers in each octave
  const viewBoxWidth = 700,
        viewBoxHeight = 400

  // Center around octave number 4
  const octaveCount = +props.octaves || 2,
        firstOctave = 4 - Math.floor((octaveCount - 1) / 2)

  // viewBox must add the stroke width to prevent clipping on edges
  const strokeWidth = 4,
        viewBox = `0 0 ${viewBoxWidth * octaveCount + strokeWidth}
                       ${viewBoxHeight + strokeWidth}`

  const octaves = [...Array(octaveCount).keys()].map(octaveNum => {
    return <g key={octaveNum}
       transform={`translate(${700 * octaveNum})`}>
      <Octave octaveNum={firstOctave + octaveNum}
              strokeWidth={strokeWidth} />
    </g>
  })

  return (
    <svg className="diatonic-piano"
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
}

Piano.defaultProps = {
  width: '100%',
  height: '100%',
  octaves: 2,
}
