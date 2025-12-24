import { getContract } from "thirdweb";
import { client } from "./client";
import { exampleChain } from "./chains";

// My Polygon NFT Collection Contract
export const nftContract = getContract({
    address: "0x8e46c897bc74405922871a8a6863ccf5cd1fc721",
    chain: exampleChain,
    client,
});
