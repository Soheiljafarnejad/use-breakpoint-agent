import { useCallback, useMemo, useRef } from "react";
import { UAParser } from "ua-parser-js";
import { BreakpointConfig, DeviceType } from "../types";
import { useSyncExternalStore } from "use-sync-external-store/shim";

function getDeviceTypeFromString(input: string | undefined): DeviceType {
  const data = UAParser(input);
  const device = data.device?.type;
  if (device === "mobile") return DeviceType.MOBILE;
  if (device === "tablet") return DeviceType.TABLET;
  else return DeviceType.DESKTOP;
}

const defaultBreakpoints: Required<BreakpointConfig> = { mobile: 768, tablet: 1024 };

const useBreakpointAgent = <T extends DeviceType | undefined>(
  initialServer: T = undefined as T,
  breakpoints?: BreakpointConfig
): T extends undefined ? DeviceType | null : DeviceType => {
  const resize = useRef(false);
  const firstWidth = useRef<number | null>(null);
  const { mobile, tablet } = useMemo(() => ({ ...defaultBreakpoints, ...breakpoints }), [breakpoints]);

  const subscribe = useCallback((listener: () => void) => {
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, []);

  const getSnapshot = useCallback((): DeviceType => {
    if (!firstWidth.current) firstWidth.current = window.innerWidth;
    if (!resize.current) {
      if (firstWidth.current !== window.innerWidth) resize.current = true;
      return getDeviceTypeFromString(navigator.userAgent);
    }
    const width = window.innerWidth;
    if (width <= mobile) return DeviceType.MOBILE;
    if (width < tablet) return DeviceType.TABLET;
    return DeviceType.DESKTOP;
  }, [mobile, tablet]);

  const getServerSnapshot = useCallback(() => initialServer ?? (null as any), [initialServer]);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) as any;
};

export default useBreakpointAgent;
