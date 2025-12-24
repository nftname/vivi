import { getContract } from "thirdweb";
import { client } from "./client";
import { exampleChain } from "./chains";

// My Polygon NFT Collection Contract
export const nftContract = getContract({
    address: "0x8e46c897bc74405922871a8a6863ccf5cd1fc721",
    chain: exampleChain,
    client,
});
    address: "0x0ACaCa3d3F64bb6e6D3564BBc891c58Bd4A4c83c",
    chain: avalancheFuji,
    title: "GoroBot",
    thumbnailUrl:
      "https://258c828e8cc853bf5e0efd001055fb39.ipfscdn.io/ipfs/bafybeiay3ffxy3os56bvnu5cmq7gids4v6n4hf5nvvcb3gy2dzavi3ltnu/profile.jpg",
    slug: "gorobot",
    type: "ERC721",
  },
  {
    address: "0x4b6CDEFF5885A57678261bb95250aC43aD490752",
    chain: polygonAmoy,
    title: "Mata NFT",
    thumbnailUrl:
      "https://258c828e8cc853bf5e0efd001055fb39.ipfscdn.io/ipfs/bafybeidec7x6bptqmrxgptaedd7wfwxbsccqfogzwfsd4a7duxn4sdmnxy/0.png",
    type: "ERC721",
  },
  {
    address: "0xd5e815241882676F772A624E3892b27Ff3a449c4",
    chain: avalancheFuji,
    title: "Cats (ERC1155)",
    thumbnailUrl:
      "https://258c828e8cc853bf5e0efd001055fb39.ipfscdn.io/ipfs/bafybeif2nz6wbwuryijk2c4ayypocibexdeirlvmciqjyvlzz46mzoirtm/0.png",
    type: "ERC1155",
  },
];
