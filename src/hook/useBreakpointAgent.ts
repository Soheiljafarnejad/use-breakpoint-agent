import { useCallback, useMemo, useRef } from "react";
import { UAParser } from "ua-parser-js";
import { BreakpointConfigType, DeviceEnum } from "../types";
import { useSyncExternalStore } from "use-sync-external-store/shim";

function getDeviceTypeFromString(input: string | undefined): DeviceEnum {
  const data = UAParser(input);
  const device = data.device?.type;
  if (device === "mobile") return DeviceEnum.MOBILE;
  if (device === "tablet") return DeviceEnum.TABLET;
  else return DeviceEnum.DESKTOP;
}

const defaultBreakpoints: Required<BreakpointConfigType> = { mobile: 768, tablet: 1024 };

const useBreakpointAgent = <T extends DeviceEnum | undefined>(
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
      if (firstWidth.current !== window.innerWidth) resize.current = true;
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

export default useBreakpointAgent;
