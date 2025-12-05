import { Note, NoteList } from 'kamasi'
import { useEffect } from 'react'
import {
  DIATONIC_KEY_HEIGHT,
  DIATONIC_KEY_WIDTH,
  KEY_STROKE_WIDTH,
} from './constants.js'
import { Octave } from './Octave.js' /**
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
 *
 * // Scale
 * <Piano pressed={scale('A minor')} />
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

  /** Called when pointer enters a key. Receives note string. Works with mouse, touch, and pen. */
  onPointerEnter?: (note: string) => void

  /** Called when pointer leaves a key. Receives note string. Works with mouse, touch, and pen. */
  onPointerLeave?: (note: string) => void

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
  onPointerEnter = () => undefined,
  onPointerLeave = () => undefined,
  onFocus = () => undefined,
  onBlur = () => undefined,
}: PianoProps) {
  // If configured, map keyboard to notes. The shift key will transpose the
  // note up one semitone, allowing you to play black keys.
  useEffect(() => {
    if (!keyboardShortcuts) return

    function handleKeyDown(e: KeyboardEvent) {
      const noteMap: Record<string, string> = {
        Q: 'C3',
        W: 'D3',
        E: 'E3',
        R: 'F3',
        T: 'G3',
        Y: 'A3',
        U: 'B3',
        A: 'C4',
        S: 'D4',
        D: 'E4',
        F: 'F4',
        G: 'G4',
        H: 'A4',
        J: 'B4',
        Z: 'C5',
        X: 'D5',
        C: 'E5',
        V: 'F5',
        B: 'G5',
        N: 'A5',
        M: 'B5',
      }
      const noteString = noteMap[e.key.toUpperCase()]
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

  // Center around octave number 4
  const octaveCount = octaves
  const firstOctave = 4 - Math.floor((octaveCount - 1) / 2)

  // The SVG element fills its container unless otherwise specified
  // ViewBox must add the stroke width to prevent clipping on edges
  const viewBoxWidth = 7 * octaveCount * DIATONIC_KEY_WIDTH
  const viewBoxHeight = DIATONIC_KEY_HEIGHT
  const viewBox = `0 0 ${viewBoxWidth + KEY_STROKE_WIDTH}
                       ${viewBoxHeight + KEY_STROKE_WIDTH}`

  // Create kamasi note lists to help us compare enharmonic notes
  const pressedNotes = ensureNoteList(pressed)
  const highlightedNotes = ensureNoteList(highlighted)

  const octaveElements = [...Array(octaveCount).keys()].map(octaveNum => {
    return (
      <g
        key={octaveNum}
        transform={`translate(${7 * DIATONIC_KEY_WIDTH * octaveNum})`}
      >
        <Octave
          octaveNum={firstOctave + octaveNum}
          pressed={pressedNotes}
          highlighted={highlightedNotes}
          focusable={focusable}
          onClick={onClick}
          onPointerEnter={onPointerEnter}
          onPointerLeave={onPointerLeave}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </g>
    )
  })

  // Determine if the piano is interactive or just a display
  const isInteractive = focusable || keyboardShortcuts

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio={preserveAspectRatio}
      className="diatonic-piano"
      role={isInteractive ? 'group' : 'img'}
      aria-label={
        isInteractive
          ? 'Piano keyboard'
          : `Piano with pressed keys: ${pressedNotes.toString() || 'none'}`
      }
      viewBox={viewBox}
      width={width}
      height={height}
    >
      {isInteractive ? (
        <title>Piano keyboard</title>
      ) : (
        <>
          <title>Piano</title>
          <desc>Pressed keys: {pressedNotes.toString() || 'none'}</desc>
        </>
      )}
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
