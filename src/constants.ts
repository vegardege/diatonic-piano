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
