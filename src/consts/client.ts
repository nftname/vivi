import { createThirdwebClient } from "thirdweb";

// Keep this fallback ONLY to prevent build failures
const clientId = process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID || process.env.NEXT_PUBLIC_CLIENT_ID || "1234567890";

// FINAL REVERT: No storage config, no gateway config. Just the raw client.
export const client = createThirdwebClient({
  clientId: clientId,
});
