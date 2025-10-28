# Changelog

All notable changes to this project will be documented in this file.

## [0.3.0] - 2025-10-28

### Breaking Changes

- **Removed `style` prop** - The component no longer accepts inline style overrides via props
- **Removed `theme` prop** - Theme-based styling has been replaced with CSS variables
- **Removed types:** `StyleOverride`, `Theme`, `KeyStyle` - No longer exported
- **Fixed dimensions** - Key dimensions (height, width, border radius) are no longer configurable

### Added

- **CSS-first styling** - Complete styling control via CSS variables and CSS selectors
- **13 CSS variables** for comprehensive theming:
  - `--piano-key-diatonic-fill` / `--piano-key-chromatic-fill`
  - `--piano-key-diatonic-pressed-fill` / `--piano-key-chromatic-pressed-fill`
  - `--piano-key-diatonic-highlighted-fill` / `--piano-key-chromatic-highlighted-fill`
  - `--piano-key-diatonic-stroke` / `--piano-key-chromatic-stroke`
  - `--piano-key-stroke-width`
  - Optional state-specific stroke overrides (4 additional variables)
- **Data attributes** for CSS targeting:
  - `data-pressed="true|false"`
  - `data-highlighted="true|false"`
  - `data-key-type="diatonic|chromatic"`
- **Default stylesheet** - Ship `styles.css` with sensible defaults
- **Package export** - `@diatonic/piano/styles.css` for easy import

### Changed

- **CSS specificity** - No `!important` needed for style overrides
- **State-specific strokes** - Different stroke colors/widths for pressed/highlighted states

## [0.2.0] - 2025-10-24

### Added

- TypeScript support with strict mode
- Comprehensive test suite (53 tests)
- Ladle stories for visual component testing
- TypeDoc for API documentation

### Changed

- Migrated from Babel + Rollup to tsup
- React peer dependency: supports 17/18/19
- Biome for linting and formatting

## [0.1.0] - 2021-02-22

Initial release with prop-based theming system.
