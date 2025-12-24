import { createThirdwebClient } from "thirdweb";

// 1. Get Client ID (Fail-safe)
const clientId = process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID || process.env.NEXT_PUBLIC_CLIENT_ID || "1234567890";

// 2. Standard Client Initialization (No Config)
export const client = createThirdwebClient({
  clientId: clientId,
});
