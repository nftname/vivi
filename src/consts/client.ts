import { createThirdwebClient } from "thirdweb";

// 1. Get Client ID (Fail-safe)
const clientId = process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID || process.env.NEXT_PUBLIC_CLIENT_ID || "";

// 2. Define Private Gateway with PATH STYLE resolution
// CRITICAL FIX: We use the direct URL pattern "gateway/ipfs/{cid}" 
// This bypasses the subdomain restrictions that cause CIDv0 errors.
const myGateway = "https://beige-kind-cricket-922.mypinata.cloud/ipfs/{cid}";

export const client = createThirdwebClient({
  clientId: clientId,
  config: {
    storage: {
      gatewayUrl: myGateway, 
    },
  },
});
