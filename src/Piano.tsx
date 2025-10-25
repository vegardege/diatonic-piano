import { Note, NoteList } from 'kamasi'
import { useEffect } from 'react'
import { Octave } from './Octave.js'
import { type KeyStyle, THEMES, type Theme } from './themes.js'

/**
 * Flexible input type for pressed/highlighted keys.
 * Can be an array of note strings, a space-separated string, or a NoteList object.
 */
export type NoteInput = string | string[] | NoteList

/**
 * Partial style overrides for diatonic and chromatic keys.
 */
export interface StyleOverride {
  diatonic?: Partial<KeyStyle>
  chromatic?: Partial<KeyStyle>
}

/**
 * Props for the Piano component.
 */
export interface PianoProps {
  preserveAspectRatio?: string
  width?: string
  height?: string
  octaves?: number
  pressed?: NoteInput
  highlighted?: NoteInput
  style?: StyleOverride
  theme?: string
  keyboardShortcuts?: boolean
  focusable?: boolean
  onClick?: (note: string) => void
  onMouseEnter?: (note: string) => void
  onMouseLeave?: (note: string) => void
  onFocus?: (note: string) => void
  onBlur?: (note: string) => void
}

/**
 * A piano is a sequence of octaves, which in terms is a sequence of keys.
 *
 * This component draws the piano as an <svg> element. It also adds keyboard
 * shortcuts, mouse, and focus events.
 */
export function Piano({
  preserveAspectRatio = 'xMinYMin meet',
  width = '100%',
  height = '100%',
  octaves = 2,
  theme = 'default',
  pressed = [],
  highlighted = [],
  keyboardShortcuts = false,
  focusable = false,
  onClick = () => undefined,
  onMouseEnter = () => undefined,
  onMouseLeave = () => undefined,
  onFocus = () => undefined,
  onBlur = () => undefined,
  style: styleOverride,
}: PianoProps) {
  // If configured, map keyboard to notes. The shift key will transpose the
  // note up one semitone, allowing you to play black keys.
  useEffect(() => {
    if (!keyboardShortcuts) return

    function handleKeyDown(e: KeyboardEvent) {
      const noteMap: Record<number, string> = {
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
      const noteString = noteMap[e.keyCode]
      if (noteString !== undefined) {
        const note = Note.fromString(noteString)
        onClick(
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
  }, [keyboardShortcuts, onClick])

  // Theme is overwritten by any style specified
  const baseTheme = (THEMES[theme] ?? THEMES.default) as Theme
  const style: Theme = {
    diatonic: { ...baseTheme.diatonic, ...styleOverride?.diatonic },
    chromatic: { ...baseTheme.chromatic, ...styleOverride?.chromatic },
  }

  // Center around octave number 4
  const octaveCount = octaves
  const firstOctave = 4 - Math.floor((octaveCount - 1) / 2)

  // The SVG element fills its container unless otherwise specified
  // ViewBox must add the stroke width to prevent clipping on edges
  const viewBoxWidth = 7 * octaveCount * style.diatonic.width
  const viewBoxHeight = style.diatonic.height
  const viewBox = `0 0 ${viewBoxWidth + style.diatonic.strokeWidth}
                       ${viewBoxHeight + style.diatonic.strokeWidth}`

  // Create kamasi note lists to help us compare enharmonic notes
  const pressedNotes = ensureNoteList(pressed)
  const highlightedNotes = ensureNoteList(highlighted)

  const octaveElements = [...Array(octaveCount).keys()].map(octaveNum => {
    return (
      <g
        key={octaveNum}
        transform={`translate(${7 * style.diatonic.width * octaveNum})`}
      >
        <Octave
          octaveNum={firstOctave + octaveNum}
          pressed={pressedNotes}
          highlighted={highlightedNotes}
          style={style}
          focusable={focusable}
          onClick={onClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </g>
    )
  })

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio={preserveAspectRatio}
      className="diatonic-piano"
      role="img"
      aria-label={`Piano: ${pressedNotes.toString()}`}
      viewBox={viewBox}
      width={width}
      height={height}
    >
      <title>Piano</title>
      <desc>Pressed keys: {pressedNotes.toString()}</desc>
      {octaveElements}
    </svg>
  )
}

/**
 * Convert various input formats into a NoteList.
 */
function ensureNoteList(input: NoteInput): NoteList {
  if (Array.isArray(input)) {
    return new NoteList(input)
  }
  if (typeof input === 'string') {
    return NoteList.fromString(input)
  }
  return input
}
