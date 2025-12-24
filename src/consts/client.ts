import { createThirdwebClient } from "thirdweb";

// 1. Setup the Client ID (Fail-safe)
const clientId = process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID || process.env.NEXT_PUBLIC_CLIENT_ID || "";

// 2. Define your Private Gateway URL (Path Style)
// We use the direct URL so it handles CIDs as paths: https://domain.com/ipfs/CID
const myGateway = "https://beige-kind-cricket-922.mypinata.cloud/ipfs/{cid}";

export const client = createThirdwebClient({
  clientId: clientId,
  config: {
    storage: {
      gatewayUrl: myGateway, // This forces Path Style resolution
    },
  },
});
