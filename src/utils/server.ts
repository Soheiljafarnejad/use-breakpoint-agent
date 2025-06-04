import { UAParser } from "ua-parser-js";
import { DeviceType } from "../types";
import type { IncomingHttpHeaders } from "http";

export function getDeviceTypeFromHeaders(headers: Headers | IncomingHttpHeaders): DeviceType {
  if (typeof window !== "undefined") {
    throw new Error("use-breakpoint-agent/server cannot be used on the client side");
  }

  let agent = headers instanceof Headers ? headers.get("user-agent") : headers["user-agent"];
  agent = Array.isArray(agent) ? agent[0] : agent;

  const data = UAParser(agent || undefined);
  const device = data.device?.type;

  if (device === "mobile") return DeviceType.MOBILE;
  if (device === "tablet") return DeviceType.TABLET;
  return DeviceType.DESKTOP;
}
