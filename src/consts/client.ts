import { createThirdwebClient } from "thirdweb";

// Standard template initialization
// We use '|| ""' to ensure the build passes even if env vars are not loaded during the build phase.
const clientId = process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID || process.env.NEXT_PUBLIC_CLIENT_ID || "";

export const client = createThirdwebClient({
  clientId: clientId,
});
