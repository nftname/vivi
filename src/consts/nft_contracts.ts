import type { Chain } from "thirdweb";
import { exampleChain } from "./chains";

export type NftContract = {
  address: string;
  chain: Chain;
  type: "ERC1155" | "ERC721";

  title?: string;
  description?: string;
  thumbnailUrl?: string;
  slug?: string;
};

// My Polygon NFT Collection Contract
export const NFT_CONTRACTS: NftContract[] = [
  {
    address: "0x8e46c897bc74405922871a8a6863ccf5cd1fc721",
    chain: exampleChain,
    type: "ERC721",
    title: "My NFT Collection",
    description: "My Polygon NFT Collection",
  },
];
