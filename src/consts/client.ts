import { createThirdwebClient } from "thirdweb";

// 1. Get Client ID (Fail-safe)
const clientId = process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID || process.env.NEXT_PUBLIC_CLIENT_ID || "1234567890";

// 2. Safe Gateway Configuration
// We only define the base URL. We do NOT use complex path resolution here to avoid crashes.
export const client = createThirdwebClient({
  clientId: clientId,
  config: {
    storage: {
      gatewayUrl: "https://beige-kind-cricket-922.mypinata.cloud/ipfs/",
    },
  },
});
