/**
 * Structural dimensions for piano keys (used to define SVG paths).
 * These are relative dimensions that scale based on the SVG viewBox.
 */
export const DIATONIC_KEY_WIDTH = 100
export const DIATONIC_KEY_HEIGHT = 400
export const CHROMATIC_KEY_WIDTH = 50
export const CHROMATIC_KEY_HEIGHT = 200
export const KEY_BORDER_RADIUS = 10

/**
 * Stroke width for piano keys (border thickness).
 */
export const KEY_STROKE_WIDTH = 2

/**
 * Default colors for piano keys (SVG presentation attributes).
 * These provide sensible defaults that work without CSS.
 * CSS rules in styles.css can override these (CSS has higher specificity).
 *
 * NOTE: If you update these colors, also update the fallback values in styles.css
 * to keep the styled and unstyled versions visually consistent.
 */
export const KEY_COLORS = {
  diatonic: {
    default: { fill: '#f7f5f0', stroke: '#c0b8b0' },
    highlighted: { fill: '#eca088', stroke: '#b8624c' },
    pressed: { fill: '#e07858', stroke: '#b8624c' },
  },
  chromatic: {
    default: { fill: '#4a423c', stroke: '#4a423c' },
    highlighted: { fill: '#b86850', stroke: '#4a423c' },
    pressed: { fill: '#c04838', stroke: '#4a423c' },
  },
} as const

/**
 * QWERTY keyboard to note mapping for keyboard shortcuts.
 * Q-U plays octave 3, A-J plays octave 4, Z-M plays octave 5.
 */
export const KEYBOARD_NOTE_MAP: Record<string, string> = {
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
} as const
