import { useCallback, useMemo, useRef } from "react";
import { type BreakpointConfigType, DeviceEnum, type WindowWithBreakpointAgentType } from "../types";
import { useSyncExternalStore } from "use-sync-external-store/shim";
import { getDeviceTypeFromString } from "../client";
import { defaultBreakpoints } from "../lib/default";

export const useBreakpointAgent = <T extends DeviceEnum | undefined>(
  initialServer: T = undefined as T,
  breakpoints?: BreakpointConfigType
): T extends undefined ? DeviceEnum | null : DeviceEnum => {
  const resize = useRef(false);
  const firstWidth = useRef<number | null>(null);
  const { mobile, tablet } = useMemo(() => ({ ...defaultBreakpoints, ...breakpoints }), [breakpoints]);

  const subscribe = useCallback((listener: () => void) => {
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, []);

  const getSnapshot = useCallback((): DeviceEnum => {
    if (!firstWidth.current) firstWidth.current = window.innerWidth;
    if (!resize.current) {
      if (firstWidth.current !== window.innerWidth) {
        resize.current = true;
        const w = window as WindowWithBreakpointAgentType;
        w.__breakpointAgent = { firstWidth: firstWidth.current, resize: true };
      }
      return getDeviceTypeFromString(navigator.userAgent);
    }
    const width = window.innerWidth;
    if (width <= mobile) return DeviceEnum.MOBILE;
    if (width < tablet) return DeviceEnum.TABLET;
    return DeviceEnum.DESKTOP;
  }, [mobile, tablet]);

  const getServerSnapshot = useCallback(() => initialServer ?? (null as any), [initialServer]);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) as any;
};
