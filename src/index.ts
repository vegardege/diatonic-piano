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
 * @see {@link Theme} - Theming system
 */

export type { NoteInput, PianoProps, StyleOverride } from './Piano.js'
export { Piano } from './Piano.js'
export type { KeyStyle, Theme } from './themes.js'
