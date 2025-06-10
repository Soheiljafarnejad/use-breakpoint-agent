export enum DeviceEnum {
  MOBILE = "mobile",
  TABLET = "tablet",
  DESKTOP = "desktop",
}

export type BreakpointConfigType = { mobile?: number; tablet?: number };

export type WindowWithBreakpointAgentType = Window & {
  __breakpointAgent?: { firstWidth: number; resize: boolean };
};
