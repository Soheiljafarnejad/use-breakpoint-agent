import { type BreakpointConfigType, DeviceEnum } from "../types";
import { getDeviceTypeFromString } from "../client";
import { defaultBreakpoints } from "../lib/default";

export const getBreakpointAgent = <T extends DeviceEnum | undefined>(
  serverDevice: T = undefined as T,
  breakpoints?: BreakpointConfigType
): T extends undefined ? DeviceEnum | null : DeviceEnum => {
  const { mobile, tablet } = { ...defaultBreakpoints, ...breakpoints };

  const getSnapshot = (): DeviceEnum => {
    const w = window as any as { __breakpointAgent: { firstWidth: number; resize: boolean } };

    if (!w.__breakpointAgent) {
      w.__breakpointAgent = { firstWidth: window.innerWidth, resize: false };

      window.addEventListener("resize", () => {
        if (w.__breakpointAgent.firstWidth !== window.innerWidth) {
          w.__breakpointAgent.resize = true;
        }
      });
    }

    if (!w.__breakpointAgent.resize) return getDeviceTypeFromString(navigator.userAgent);

    const width = window.innerWidth;
    if (width <= mobile) return DeviceEnum.MOBILE;
    if (width < tablet) return DeviceEnum.TABLET;
    return DeviceEnum.DESKTOP;
  };

  const getServerSnapshot = () => serverDevice ?? (null as any);

  return typeof window === "undefined" ? getServerSnapshot() : getSnapshot();
};
