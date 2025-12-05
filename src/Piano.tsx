import { Note, NoteList } from 'kamasi'
import { useEffect } from 'react'
import {
  DIATONIC_KEY_HEIGHT,
  DIATONIC_KEY_WIDTH,
  KEY_STROKE_WIDTH,
  KEYBOARD_NOTE_MAP,
} from './constants.js'
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

  /**
   * Enable direct key interaction via mouse/touch and keyboard focus.
   * When true, keys are focusable (Tab navigation) and clickable.
   * @defaultValue `false`
   */
  interactive?: boolean

  /**
   * Enable QWERTY keyboard shortcuts for playing notes (Q-U, A-J, Z-M).
   * Works independently of `interactive` - you can have keyboard shortcuts
   * without making individual keys interactive.
   * @defaultValue `false`
   */
  keyboardShortcuts?: boolean

  /**
   * Called when a key is pressed via click, Enter key, or keyboard shortcut.
   * @param note - The note string (e.g., 'C4')
   * @param event - The originating event (MouseEvent or KeyboardEvent)
   */
  onPress?: (note: string, event: MouseEvent | KeyboardEvent) => void

  /**
   * Called when a key is highlighted via pointer enter or focus.
   * @param note - The note string (e.g., 'C4')
   * @param event - The originating event (PointerEvent or FocusEvent)
   */
  onHighlightStart?: (note: string, event: PointerEvent | FocusEvent) => void

  /**
   * Called when a key highlight ends via pointer leave or blur.
   * @param note - The note string (e.g., 'C4')
   * @param event - The originating event (PointerEvent or FocusEvent)
   */
  onHighlightEnd?: (note: string, event: PointerEvent | FocusEvent) => void
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
 * import { scale } from 'kamasi'
 * import '@diatonic/piano/styles.css'
 *
 * <Piano highlighted={scale('E minor'))} />
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
  interactive = false,
  keyboardShortcuts = false,
  onPress = () => undefined,
  onHighlightStart = () => undefined,
  onHighlightEnd = () => undefined,
}: PianoProps) {
  // Center around octave number 4
  const firstOctave = 4 - Math.floor((octaves - 1) / 2)
  const lastOctave = firstOctave + octaves - 1

  // If configured, map keyboard to notes. The shift key will transpose the
  // note up one semitone, allowing you to play black keys.
  // Only map keys that correspond to visible octaves.
  useEffect(() => {
    if (!keyboardShortcuts) return

    function handleKeyDown(e: KeyboardEvent) {
      const noteString = KEYBOARD_NOTE_MAP[e.key.toUpperCase()]
      if (noteString !== undefined) {
        const note = Note.fromString(noteString)
        if (note.octave >= firstOctave && note.octave <= lastOctave) {
          onPress(
            e.shiftKey
              ? note.transpose('m2').simplify().toString()
              : note.toString(),
            e,
          )
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [keyboardShortcuts, onPress, firstOctave, lastOctave])

  // The SVG element fills its container unless otherwise specified
  // ViewBox must add the stroke width to prevent clipping on edges
  const viewBoxWidth = 7 * octaves * DIATONIC_KEY_WIDTH
  const viewBoxHeight = DIATONIC_KEY_HEIGHT
  const viewBox = `0 0 ${viewBoxWidth + KEY_STROKE_WIDTH}
                       ${viewBoxHeight + KEY_STROKE_WIDTH}`

  // Create kamasi note lists to help us compare enharmonic notes
  const pressedNotes = ensureNoteList(pressed)
  const highlightedNotes = ensureNoteList(highlighted)

  const octaveElements = [...Array(octaves).keys()].map(octaveNum => {
    return (
      <g
        key={octaveNum}
        transform={`translate(${7 * DIATONIC_KEY_WIDTH * octaveNum})`}
      >
        <Octave
          octaveNum={firstOctave + octaveNum}
          pressed={pressedNotes}
          highlighted={highlightedNotes}
          interactive={interactive}
          onPress={onPress}
          onHighlightStart={onHighlightStart}
          onHighlightEnd={onHighlightEnd}
        />
      </g>
    )
  })

  // Determine if the piano is interactive or just a display
  const isInteractive = interactive || keyboardShortcuts

  // Description for browsers without SVG support
  const ariaLabel = !pressedNotes.isEmpty()
    ? `Pressed keys: ${pressedNotes.toString()}`
    : 'No pressed keys'

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio={preserveAspectRatio}
      className="diatonic-piano"
      role={isInteractive ? 'group' : 'img'}
      aria-label={`Piano - ${ariaLabel}`}
      viewBox={viewBox}
      width={width}
      height={height}
    >
      {isInteractive ? (
        <title>Piano</title>
      ) : (
        <>
          <title>Piano</title>
          <desc>{ariaLabel}</desc>
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
