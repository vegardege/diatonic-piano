/**
 * @packageDocumentation
 * Interactive SVG piano component for React.
 *
 * A lightweight, stateless, customizable piano component that renders as SVG.
 * Supports multiple octaves, mouse and keyboard interactions, and flexible styling.
 *
 * Created to integrate with the `kamasi` music theory library
 *
 * ## Quick Start
 * ```tsx
 * import { Piano } from 'diatonic-piano'
 *
 * function App() {
 *   return <Piano />
 * }
 * ```
 *
 * @see {@link Piano} - Main component
 * @see {@link PianoProps} - Component props
 *
 * ## Styling
 *
 * Import the default styles:
 * ```tsx
 * import '@diatonic/piano/styles.css'
 * ```
 *
 * Customize with CSS variables:
 * ```css
 * :root {
 *   --piano-key-diatonic-fill: #f0f0f0;
 *   --piano-key-diatonic-pressed-fill: #ff0000;
 * }
 * ```
 */

export {
  CHROMATIC_KEY_HEIGHT,
  CHROMATIC_KEY_WIDTH,
  DIATONIC_KEY_HEIGHT,
  DIATONIC_KEY_WIDTH,
  KEY_BORDER_RADIUS,
  KEY_COLORS,
  KEY_STROKE_WIDTH,
} from './constants.js'
export type { NoteInput, PianoProps } from './Piano.js'
export { Piano } from './Piano.js'
