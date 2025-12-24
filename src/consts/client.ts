import { createThirdwebClient } from "thirdweb";

// Remove the invalid fallback string to stop the client-side crash
const clientId = process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID || process.env.NEXT_PUBLIC_CLIENT_ID;

if (!clientId) {
  // This will fail at build time if the key is missing in Vercel, which is better than a runtime crash.
  throw new Error("No client ID provided"); 
}

export const client = createThirdwebClient({
  clientId: clientId,
});
