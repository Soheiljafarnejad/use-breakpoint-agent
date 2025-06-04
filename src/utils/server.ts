import { UAParser } from "ua-parser-js";
import { DeviceEnum } from "../types";
import type { IncomingHttpHeaders } from "http";

export function getDeviceTypeFromHeaders(headers: Headers | IncomingHttpHeaders): DeviceEnum {
  if (typeof window !== "undefined") {
    throw new Error("use-breakpoint-agent/server cannot be used on the client side");
  }

  let agent = headers instanceof Headers ? headers.get("user-agent") : headers["user-agent"];
  agent = Array.isArray(agent) ? agent[0] : agent;

  const data = UAParser(agent || undefined);
  const device = data.device?.type;

  if (device === "mobile") return DeviceEnum.MOBILE;
  if (device === "tablet") return DeviceEnum.TABLET;
  return DeviceEnum.DESKTOP;
}
