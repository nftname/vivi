import { createThirdwebClient } from "thirdweb";

// Ensure we have a clientId, fallback to empty string to avoid build errors
const clientId = process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID || process.env.NEXT_PUBLIC_CLIENT_ID || "";

export const client = createThirdwebClient({
  clientId: clientId,
  // We REMOVED the 'gatewayUrl' property here to let it use the default public gateway.
  // This solves the "Invalid CID in hostname" error.
});
