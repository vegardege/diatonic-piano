import { Note, NoteList } from 'kamasi'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { Octave } from './Octave.js'
import { THEMES } from './themes.js'

/**
 * A piano is a sequence of octaves, which in terms is a sequence of keys.
 *
 * This component draws the piano as an <svg> element. It also adds keyboard
 * shortcuts, mouse, and focus events.
 */
export function Piano(props) {
  // If configured, map keyboard to notes. The shift key will transpose the
  // note up one semitone, allowing you to play black keys.
  useEffect(() => {
    if (!props.keyboardShortcuts) return

    function handleKeyDown(e) {
      const noteMap = {
        81: 'C3',
        87: 'D3',
        69: 'E3',
        82: 'F3',
        84: 'G3',
        89: 'A3',
        85: 'B3',
        65: 'C4',
        83: 'D4',
        68: 'E4',
        70: 'F4',
        71: 'G4',
        72: 'A4',
        74: 'B4',
        90: 'C5',
        88: 'D5',
        67: 'E5',
        86: 'F5',
        66: 'G5',
        78: 'A5',
        77: 'B5',
      }
      if (noteMap[e.keyCode] !== undefined) {
        const note = Note.fromString(noteMap[e.keyCode])
        props.onClick(
          e.shiftKey
            ? note.transpose('m2').simplify().toString()
            : note.toString(),
        )
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [props.keyboardShortcuts, props.onClick])

  // Theme is overwritten by any style specified
  const theme = THEMES[props.theme] || THEMES.default
  const style = {
    diatonic: { ...theme.diatonic, ...props?.style?.diatonic },
    chromatic: { ...theme.chromatic, ...props?.style?.chromatic },
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
    return (
      <g
        key={octaveNum}
        transform={`translate(${7 * style.diatonic.width * octaveNum})`}
      >
        <Octave
          octaveNum={firstOctave + octaveNum}
          pressed={pressed}
          highlighted={highlighted}
          style={style}
          focusable={props.focusable}
          onClick={props.onClick}
          onMouseEnter={props.onMouseEnter}
          onMouseLeave={props.onMouseLeave}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
        />
      </g>
    )
  })

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio={props.preserveAspectRatio}
      className="diatonic-piano"
      role="img"
      aria-label={`Piano: ${pressed.toString()}`}
      viewBox={viewBox}
      width={props.width}
      height={props.height}
    >
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
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
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
  onFocus: () => undefined,
  onBlur: () => undefined,
}

function ensureType(object, cls) {
  return Array.isArray(object)
    ? new cls(object)
    : typeof object === 'string'
      ? cls.fromString(object)
      : object
}
