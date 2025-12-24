import { createThirdwebClient } from "thirdweb";

// Fallback to ensure build passes if env vars are missing
const clientId = process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID || process.env.NEXT_PUBLIC_CLIENT_ID || "1234567890";

// Standard client initialization (No complex gateway config)
export const client = createThirdwebClient({
  clientId: clientId,
});
