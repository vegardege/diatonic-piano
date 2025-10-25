/**
 * Style properties for a single key (diatonic or chromatic).
 */
export interface KeyStyle {
  fill: string
  pressed: string
  highlighted: string
  stroke: string
  strokeWidth: number
  height: number
  width: number
  rx: number
}

/**
 * A theme defines the default styling for diatonic (white) and chromatic (black) keys.
 */
export interface Theme {
  diatonic: KeyStyle
  chromatic: KeyStyle
}

/**
 * These themes can be set with the `theme` prop, but
 * will be overriden by anything in the `style` prop.
 */
export const THEMES: Record<string, Theme> = {
  default: {
    diatonic: {
      fill: '#fff',
      pressed: '#E84855',
      highlighted: '#F2929A',

      stroke: '#000',
      strokeWidth: 4,

      height: 400,
      width: 100,
      rx: 10,
    },
    chromatic: {
      fill: '#000',
      pressed: '#E84855',
      highlighted: '#F2929A',

      stroke: '#000',
      strokeWidth: 4,

      height: 200,
      width: 50,
      rx: 10,
    },
  },
}
