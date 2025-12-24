import { getContract } from "thirdweb";
import { client } from "./client";
import { exampleChain } from "./chains";

// My Polygon Marketplace Contract
export const marketplaceContract = getContract({
    address: "0xbc1e247e6eec6c179f77b6E28A0c90609EB1c4EB",
    chain: exampleChain,
    client,
});
