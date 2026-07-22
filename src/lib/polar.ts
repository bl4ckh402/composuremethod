import { Polar } from "@polar-sh/sdk";

export function getPolarClient() {
  const accessToken = process.env.POLAR_ACCESS_TOKEN;
  const server = (process.env.POLAR_SERVER as "sandbox" | "production") || "production";

  return new Polar({
    accessToken: accessToken || "",
    server,
  });
}
