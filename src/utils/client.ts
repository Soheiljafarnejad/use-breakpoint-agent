import { DeviceType } from "../types";
import { UAParser } from "ua-parser-js";

export function getDeviceTypeFromString(input: string | undefined): DeviceType {
  if (typeof window === "undefined") {
    throw new Error("use-breakpoint-agent/client cannot be used on the server side");
  }

  const data = UAParser(input);
  const device = data.device?.type;

  if (device === "mobile") return DeviceType.MOBILE;
  if (device === "tablet") return DeviceType.TABLET;
  return DeviceType.DESKTOP;
}
