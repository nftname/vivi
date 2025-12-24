import { createThirdwebClient } from "thirdweb";

// Attempt to retrieve the client ID, but fallback to an empty string to prevent build crashes
const clientId = process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID || process.env.NEXT_PUBLIC_CLIENT_ID || "";

export const client = createThirdwebClient({
  clientId: clientId,
});
