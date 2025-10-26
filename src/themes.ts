/**
 * Style properties for a single key (diatonic or chromatic).
 *
 * Defines the visual appearance including colors for different states,
 * dimensions, and border styling.
 */
export interface KeyStyle {
  /** Fill color for the key in default state */
  fill: string

  /** Fill color when the key is pressed */
  pressed: string

  /** Fill color when the key is highlighted */
  highlighted: string

  /** Border color */
  stroke: string

  /** Border width */
  strokeWidth: number

  /** Height of the key (in SVG units) */
  height: number

  /** Width of the key (in SVG units) */
  width: number

  /** Border radius for rounded corners */
  rx: number
}

/**
 * A theme defines the default styling for diatonic (white) and chromatic (black) keys.
 *
 * Themes provide a complete style specification that can be selected via the
 * `theme` prop and further customized with the `style` prop.
 *
 * @example
 * ```tsx
 * // Use the default theme
 * <Piano theme="default" />
 *
 * // Use default theme with custom overrides
 * <Piano
 *   theme="default"
 *   style={{
 *     diatonic: { fill: '#f0f0f0' },
 *     chromatic: { fill: '#333' }
 *   }}
 * />
 * ```
 */
export interface Theme {
  /** Style for white keys */
  diatonic: KeyStyle

  /** Style for black keys */
  chromatic: KeyStyle
}

/**
 * Available themes for the Piano component.
 *
 * Themes can be selected using the `theme` prop and will be
 * overridden by any values provided in the `style` prop.
 *
 * Currently includes:
 * - `default`: Classic black and white piano with red pressed/highlighted states
 *
 * @example
 * ```tsx
 * <Piano theme="default" />
 * ```
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
