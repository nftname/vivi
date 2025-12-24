import { createThirdwebClient } from "thirdweb";

// Fallback is REQUIRED to prevent build error: "No client ID provided"
const clientId = process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID || process.env.NEXT_PUBLIC_CLIENT_ID || "00000000000000000000000000000000";

export const client = createThirdwebClient({
  clientId: clientId,
});
