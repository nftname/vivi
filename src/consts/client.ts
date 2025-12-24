import { createThirdwebClient } from "thirdweb";

// 1. Define a fallback to prevent build crashes
const secretKey = process.env.TW_SECRET_KEY;
const clientId = process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID || 
                 process.env.NEXT_PUBLIC_CLIENT_ID || 
                 "1234567890"; // Fake fallback just to pass the build phase

// 2. Create the client safely
export const client = createThirdwebClient({
  clientId: clientId,
  secretKey: secretKey, 
});
