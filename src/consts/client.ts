import { createThirdwebClient } from "thirdweb";

// 1. Get Client ID (With a dummy fallback to prevent build crashes)
const clientId = process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID || 
                 process.env.NEXT_PUBLIC_CLIENT_ID || 
                 "1234567890"; // Fake key just to pass the build process

// 2. Define Private Gateway (Path Style)
// We keep your config to ensure images load correctly later
const myGateway = "https://beige-kind-cricket-922.mypinata.cloud/ipfs/{cid}";

export const client = createThirdwebClient({
  clientId: clientId,
  config: {
    storage: {
      gatewayUrl: myGateway, 
    },
  },
});
