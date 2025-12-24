import type { Chain } from "thirdweb";
import { exampleChain } from "./chains";

type MarketplaceContract = {
  address: string;
  chain: Chain;
};

// My Polygon Marketplace Contract
export const MARKETPLACE_CONTRACTS: MarketplaceContract[] = [
  {
    address: "0xbc1e247e6eec6c179f77b6E28A0c90609EB1c4EB",
    chain: exampleChain,
  },
];
