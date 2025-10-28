import { Note, NoteList } from 'kamasi'
import { useEffect } from 'react'
import { Octave } from './Octave.js'

/**
 * Flexible input type for pressed/highlighted keys.
 *
 * Can be provided in three formats:
 * - Array of note strings: `['C4', 'E4', 'G4']`
 * - Space-separated string: `'C4 E4 G4'`
 * - NoteList object from kamasi: `new NoteList(['C4', 'E4', 'G4'])`
 *
 * @example
 * ```tsx
 * // Array format
 * <Piano pressed={['C4', 'E4', 'G4']} />
 *
 * // String format
 * <Piano pressed="C4 E4 G4" />
 *
 * // NoteList format
 * <Piano pressed={new NoteList(['C4', 'E4', 'G4'])} />
 * ```
 */
export type NoteInput = string | string[] | NoteList

/**
 * Props for the Piano component.
 */
export interface PianoProps {
  /** SVG preserveAspectRatio attribute. @defaultValue `'xMinYMin meet'` */
  preserveAspectRatio?: string

  /** Width of the SVG element. @defaultValue `'100%'` */
  width?: string

  /** Height of the SVG element. @defaultValue `'100%'` */
  height?: string

  /** Number of octaves to display. @defaultValue `2` */
  octaves?: number

  /** Keys to render as pressed. @defaultValue `[]` */
  pressed?: NoteInput

  /** Keys to render as highlighted. @defaultValue `[]` */
  highlighted?: NoteInput

  /** Enable keyboard shortcuts (Q-U, A-J, Z-M). @defaultValue `false` */
  keyboardShortcuts?: boolean

  /** Enable keyboard navigation via Tab and Enter. @defaultValue `false` */
  focusable?: boolean

  /** Called when a key is clicked. Receives note string (e.g., 'C4'). */
  onClick?: (note: string) => void

  /** Called when mouse enters a key. Receives note string. */
  onMouseEnter?: (note: string) => void

  /** Called when mouse leaves a key. Receives note string. */
  onMouseLeave?: (note: string) => void

  /** Called when a key receives focus (when focusable). Receives note string. */
  onFocus?: (note: string) => void

  /** Called when a key loses focus (when focusable). Receives note string. */
  onBlur?: (note: string) => void
}

/**
 * Interactive SVG piano component for React.
 *
 * Renders a customizable piano keyboard with support for multiple octaves,
 * mouse and keyboard interactions, and flexible styling. The component is
 * fully stateless - all visual state is controlled by the parent component
 * through props.
 *
 * @example
 * Basic usage with 2 octaves:
 * ```tsx
 * <Piano />
 * ```
 *
 * @example
 * Interactive piano with click handling:
 * ```tsx
 * const [pressed, setPressed] = useState<string[]>([])
 *
 * <Piano
 *   pressed={pressed}
 *   onClick={note => setPressed(prev =>
 *     prev.includes(note)
 *       ? prev.filter(n => n !== note)
 *       : [...prev, note]
 *   )}
 * />
 * ```
 *
 * @example
 * With hover and focus highlighting:
 * ```tsx
 * import '@diatonic/piano/styles.css'
 *
 * const [pressed, setPressed] = useState<string[]>([])
 * const [highlighted, setHighlighted] = useState<string[]>([])
 *
 * <Piano
 *   pressed={pressed}
 *   highlighted={highlighted}
 *   focusable={true}
 *   onClick={note => setPressed(prev => [...prev, note])}
 *   onMouseEnter={note => setHighlighted([note])}
 *   onMouseLeave={() => setHighlighted([])}
 *   onFocus={note => setHighlighted([note])}
 *   onBlur={() => setHighlighted([])}
 * />
 * ```
 *
 * @example
 * Displaying a musical scale:
 * ```tsx
 * import { NoteList } from 'kamasi'
 * import '@diatonic/piano/styles.css'
 *
 * <Piano highlighted={new NoteList(['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'])} />
 * ```
 *
 * @example
 * Custom styling with CSS variables:
 * ```css
 * :root {
 *   --piano-key-diatonic-fill: #f0f0f0;
 *   --piano-key-diatonic-pressed-fill: #ff0000;
 * }
 * ```
 */
export function Piano({
  preserveAspectRatio = 'xMinYMin meet',
  width = '100%',
  height = '100%',
  octaves = 2,
  pressed = [],
  highlighted = [],
  keyboardShortcuts = false,
  focusable = false,
  onClick = () => undefined,
  onMouseEnter = () => undefined,
  onMouseLeave = () => undefined,
  onFocus = () => undefined,
  onBlur = () => undefined,
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

  // Fixed dimensions (not configurable)
  const DIATONIC_WIDTH = 100
  const DIATONIC_HEIGHT = 400
  const STROKE_WIDTH = 4

  // Center around octave number 4
  const octaveCount = octaves
  const firstOctave = 4 - Math.floor((octaveCount - 1) / 2)

  // The SVG element fills its container unless otherwise specified
  // ViewBox must add the stroke width to prevent clipping on edges
  const viewBoxWidth = 7 * octaveCount * DIATONIC_WIDTH
  const viewBoxHeight = DIATONIC_HEIGHT
  const viewBox = `0 0 ${viewBoxWidth + STROKE_WIDTH}
                       ${viewBoxHeight + STROKE_WIDTH}`

  // Create kamasi note lists to help us compare enharmonic notes
  const pressedNotes = ensureNoteList(pressed)
  const highlightedNotes = ensureNoteList(highlighted)

  const octaveElements = [...Array(octaveCount).keys()].map(octaveNum => {
    return (
      <g
        key={octaveNum}
        transform={`translate(${7 * DIATONIC_WIDTH * octaveNum})`}
      >
        <Octave
          octaveNum={firstOctave + octaveNum}
          pressed={pressedNotes}
          highlighted={highlightedNotes}
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
