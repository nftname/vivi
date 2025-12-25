"use client";

import React, { useState } from "react";
import { client } from "@/consts/client";
import { defineChain, getContract } from "thirdweb";
import { claimTo } from "thirdweb/extensions/erc721";
import { TransactionButton, useActiveAccount } from "thirdweb/react";

const TIERS = [
  {
    id: "IMMORTAL",
    name: "The Immortal",
    price: "0.015",
    image: "/images/tier-immortal.jpg",
    color: "border-yellow-600 shadow-yellow-900",
    bg: "bg-gradient-to-b from-black to-yellow-950",
    description: "The highest tier. For 3-letter, 2-letter, and AI names.",
  },
  {
    id: "ELITE",
    name: "The Elite",
    price: "0.01",
    image: "/images/tier-elite.jpg",
    color: "border-red-800 shadow-red-900",
    bg: "bg-gradient-to-b from-black to-red-950",
    description: "For distinctive and strong names.",
  },
  {
    id: "FOUNDER",
    name: "The Founder",
    price: "0.003",
    image: "/images/tier-founders.jpg",
    color: "border-cyan-500 shadow-cyan-900",
    bg: "bg-gradient-to-b from-black to-cyan-950",
    description: "Entry level for early adopters.",
  },
];

const CONTRACT_ADDRESS = "0x8e46c897bc74405922871a8a6863ccf5cd1fc721"; 
const chain = defineChain(84532);

const contract = getContract({
  client: client,
  chain: chain,
  address: CONTRACT_ADDRESS,
});

export default function FactoryPage() {
  const account = useActiveAccount();
  const [selectedTier, setSelectedTier] = useState(TIERS[1]);

  return (
    <div className="min-h-screen bg-black text-white pb-32">
      
      <div className="relative w-full h-[50vh] overflow-hidden mb-12">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <img 
          src="/images/hero-main.jpg" 
          alt="NNM Protocol" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
            NNM Name Factory
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Choose your classification. Mint your legacy.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-center border-b border-gray-800 pb-4">Select Classification</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TIERS.map((tier) => (
            <div
              key={tier.id}
              onClick={() => setSelectedTier(tier)}
              className={`cursor-pointer rounded-2xl border-2 p-1 transition-all duration-300 hover:-translate-y-2 ${
                selectedTier.id === tier.id 
                  ? `${tier.color} scale-100 shadow-2xl` 
                  : "border-gray-800 opacity-60 hover:opacity-100"
              }`}
            >
              <div className={`rounded-xl p-6 h-full flex flex-col ${tier.bg}`}>
                <div className="relative aspect-square w-full mb-6 overflow-hidden rounded-lg shadow-lg">
                  <img 
                    src={tier.image} 
                    alt={tier.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <h3 className="text-3xl font-bold mb-2">{tier.name}</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-2xl font-mono text-white">{tier.price} ETH</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{tier.description}</p>
                
                <div className={`mt-auto pt-6 w-full flex justify-center`}>
                  <div className={`w-6 h-6 rounded-full border-2 ${selectedTier.id === tier.id ? "bg-white border-white" : "border-gray-600"}`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-black/80 backdrop-blur-xl border-t border-gray-800 p-6 z-50">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img 
              src={selectedTier.image} 
              alt="Selected" 
              className="w-16 h-16 rounded-lg object-cover border border-gray-700"
            />
            <div>
              <p className="text-sm text-gray-400">Minting Selection</p>
              <h2 className="text-xl font-bold">{selectedTier.name}</h2>
            </div>
          </div>

          <TransactionButton
            transaction={() => {
              return claimTo({
                contract: contract,
                to: account?.address || "",
                quantity: BigInt(1),
              });
            }}
            onTransactionConfirmed={(tx) => {
              alert("Mint Successful!");
            }}
            onError={(error) => {
              console.error(error);
              alert("Mint Failed");
            }}
            style={{
              backgroundColor: "white",
              color: "black",
              padding: "16px 48px",
              fontWeight: "900",
              fontSize: "18px",
              borderRadius: "8px",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            MINT FOR {selectedTier.price} ETH
          </TransactionButton>
        </div>
      </div>
    </div>
  );
}
