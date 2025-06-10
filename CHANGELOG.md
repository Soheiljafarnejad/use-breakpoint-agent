# Changelog

## [1.1.1](https://github.com/Soheiljafarnejad/use-breakpoint-agent/compare/v1.1.0...v1.1.1) (2025-06-10)


### Bug Fixes

* 🐛 resolve incorrect device detection on resize in useBreakpointAgent ([e21f94e](https://github.com/Soheiljafarnejad/use-breakpoint-agent/commit/e21f94ece585a111e7762cbe07b1333bead37443))

## [1.1.0](https://github.com/Soheiljafarnejad/use-breakpoint-agent/compare/v1.0.5...v1.1.0) (2025-06-10)


### Features

* ✨ add getBreakpointAgent utility for static device type detection ([d81016f](https://github.com/Soheiljafarnejad/use-breakpoint-agent/commit/d81016f3d30835f080e0c29b3b62727606d5d13c))
- Provides a non-reactive function to determine device type based on viewport width and userAgent
- Useful for initializing state in Redux Toolkit, Zustand, or other static scenarios
- Avoids use of hooks and event listeners for simple one-time device checks

### Bug Fixes

* sync logic between getBreakpointAgent and useBreakpointAgent for consistent resize and first-load detection ([01506d9](https://github.com/Soheiljafarnejad/use-breakpoint-agent/commit/01506d9d93efdca3e58390ce1447f3f28a2a1155))

## [1.0.5](https://github.com/Soheiljafarnejad/use-breakpoint-agent/compare/v1.0.4...v1.0.5) (2025-06-10)


### Bug Fixes

* 🏷️ Export useBreakpointAgent as named export and update types declaration for proper autocomplete support ([4f7a079](https://github.com/Soheiljafarnejad/use-breakpoint-agent/commit/4f7a079eedfbbce5f6514962b33b170ee135c22e))

## [1.0.4](https://github.com/Soheiljafarnejad/use-breakpoint-agent/compare/v1.0.3...v1.0.4) (2025-06-07)


### Bug Fixes

* Update README.md ([70d0dfb](https://github.com/Soheiljafarnejad/use-breakpoint-agent/commit/70d0dfb6e61a82375dbc72717d09486f4f455468))

## [1.0.3](https://github.com/Soheiljafarnejad/use-breakpoint-agent/compare/v1.0.2...v1.0.3) (2025-06-04)


### Bug Fixes

* 🐛 Added default Input in getDeviceTypeFromString ([2af40f9](https://github.com/Soheiljafarnejad/use-breakpoint-agent/commit/2af40f991807a2175ba1f6357a859334a5e17929))

## [1.0.2](https://github.com/Soheiljafarnejad/use-breakpoint-agent/compare/v1.0.1...v1.0.2) (2025-06-04)


### Bug Fixes

* 📝 Update README.md ([c95200e](https://github.com/Soheiljafarnejad/use-breakpoint-agent/commit/c95200e98b12fa0f80a12d8cb11f2efebb3081d3))

## [1.0.1](https://github.com/Soheiljafarnejad/use-breakpoint-agent/compare/v1.0.0...v1.0.1) (2025-06-04)


### Bug Fixes

* 🚚 Rename DeviceType -&gt; DeviceEnum and BreakpointConfig -&gt; BreakpointConfigType ([0b78439](https://github.com/Soheiljafarnejad/use-breakpoint-agent/commit/0b7843994abf78152d6f66824f8efca54d1f7774))

## 1.0.0 (2025-06-04)


### Features

* 🎉 Begin Project ... ([99026f5](https://github.com/Soheiljafarnejad/use-breakpoint-agent/commit/99026f52915bdca128bbbc792693383f95a04b89))
