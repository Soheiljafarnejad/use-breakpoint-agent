import { DeviceEnum } from "../types";
import { UAParser } from "ua-parser-js";

export function getDeviceTypeFromString(input: string | undefined): DeviceEnum {
  if (typeof window === "undefined") {
    throw new Error("use-breakpoint-agent/client cannot be used on the server side");
  }

  const data = UAParser(input || navigator.userAgent);
  const device = data.device?.type;

  if (device === "mobile") return DeviceEnum.MOBILE;
  if (device === "tablet") return DeviceEnum.TABLET;
  return DeviceEnum.DESKTOP;
}
