"use client";

import React, { useState } from "react";
import { client } from "@/consts/client";
import { defineChain, getContract, prepareContractCall, readContract, toWei } from "thirdweb";
import { TransactionButton, useActiveAccount, useReadContract } from "thirdweb/react";
import { upload } from "thirdweb/storage";
import { keccak256, toBytes } from "thirdweb/utils"; // 
// --- Configuration ---
const CONTRACT_ADDRESS = "0x8e46c897bc74405922871a8a6863ccf5cd1fc721";
const CHAIN_ID = 137; // Polygon Mainnet
const chain = defineChain(CHAIN_ID);

const contract = getContract({
  client: client,
  chain: chain,
  address: CONTRACT_ADDRESS,
});

// --- Tiers Data ---
const TIERS = [
  {
    index: 0,
    id: "IMMORTAL",
    name: "THE IMMORTAL",
    usdPrice: 50,
    image: "/images/tier-immortal.jpg", 
    bg: "bg-gradient-to-b from-yellow-950 to-black",
    border: "border-yellow-600",
    desc: "For Kings, Queens, AI, and 2-3 Letter Names.",
  },
  {
    index: 1,
    id: "ELITE",
    name: "THE ELITE",
    usdPrice: 30,
    image: "/images/tier-elite.jpg", 
    bg: "bg-gradient-to-b from-red-950 to-black",
    border: "border-red-700",
    desc: "For Powerful and Distinctive Names.",
  },
  {
    index: 2,
    id: "FOUNDER",
    name: "THE FOUNDER",
    usdPrice: 10,
    image: "/images/tier-founders.jpg", 
    bg: "bg-gradient-to-b from-cyan-950 to-black",
    border: "border-cyan-600",
    desc: "Entry level for Early Adopters.",
  },
];

export default function FactoryPage() {
  const account = useActiveAccount();
  
  // State
  const [nameInput, setNameInput] = useState("");
  const [isNameAvailable, setIsNameAvailable] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [checkMessage, setCheckMessage] = useState("");

  // Read Contract Owner to identify Admin
  const { data: ownerAddress } = useReadContract({
    contract,
    method: "function owner() view returns (address)",
    params: [],
  });

  // --- Helpers ---

  // 1. Input Validation (A-Z, 0-9 Only)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Force uppercase and remove non-alphanumeric
    const val = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    setNameInput(val);
    setIsNameAvailable(null); // Reset status on change
    setCheckMessage("");
  };

  // 2. Check Name Availability
  const checkAvailability = async () => {
    if (!nameInput || nameInput.length < 2) {
      setCheckMessage("Name must be at least 2 characters.");
      return;
    }
    setIsChecking(true);
    setCheckMessage("");

    try {
      // ✅ التصحيح: استخدام دالة التشفير الخاصة بـ thirdweb
      // This matches Solidity: keccak256(abi.encodePacked(_name))
      const nameHash = keccak256(toBytes(nameInput));

      const isRegistered = await readContract({
        contract,
        method: "function registeredNames(bytes32) view returns (bool)",
        params: [nameHash],
      });

      if (isRegistered) {
        setIsNameAvailable(false);
        setCheckMessage("⚠️ This name is already taken. Please choose another.");
      } else {
        setIsNameAvailable(true);
        setCheckMessage("✅ Name is available! Select a Tier to Mint.");
      }
    } catch (error) {
      console.error(error);
      setCheckMessage("Error checking availability.");
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pb-32 pt-24">
      {/* Hero Header */}
      <div className="text-center mb-12 px-4">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
          NAME FACTORY
        </h1>
        <p className="text-xl text-gray-400">Mint your sovereign identity on Polygon.</p>
        {account && ownerAddress === account.address && (
           <div className="mt-2 inline-block bg-red-900/50 border border-red-500 px-3 py-1 rounded text-xs text-red-200">
             ADMIN MODE ACTIVE (Gas Only)
           </div>
        )}
      </div>

      <div className="max-w-6xl mx-auto px-6">
        
        {/* --- STEP 1: Name Input --- */}
        <div className="max-w-xl mx-auto mb-16">
          <div className="relative">
            <input
              type="text"
              value={nameInput}
              onChange={handleInputChange}
              placeholder="ENTER NAME (A-Z, 0-9)"
              className="w-full bg-gray-900/50 border-2 border-gray-700 rounded-xl p-6 text-3xl text-center font-mono text-white focus:border-white outline-none transition-all placeholder:text-gray-700"
              maxLength={40}
            />
            <p className="text-center text-gray-500 text-sm mt-2">
              Allowed: A-Z, 0-9. No symbols. Length: 2-40.
            </p>
          </div>

          <div className="mt-6 flex justify-center">
             <button
               onClick={checkAvailability}
               disabled={!nameInput || isChecking}
               className={`px-8 py-3 rounded-lg font-bold text-lg transition-all ${
                 isChecking ? "bg-gray-800 text-gray-500" : "bg-white text-black hover:scale-105"
               }`}
             >
               {isChecking ? "CHECKING..." : "CHECK AVAILABILITY"}
             </button>
          </div>

          {/* Availability Message */}
          {checkMessage && (
            <div className={`mt-4 text-center text-lg font-bold ${isNameAvailable ? "text-green-400" : "text-red-500"}`}>
              {checkMessage}
            </div>
          )}
        </div>


        {/* --- STEP 2: Select Tier (Only shown if Available) --- */}
        {isNameAvailable && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in-up">
            {TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`relative rounded-2xl border-2 ${tier.border} p-1 transition-transform hover:-translate-y-2`}
              >
                <div className={`rounded-xl p-6 h-full flex flex-col ${tier.bg}`}>
                  
                  {/* Image */}
                  <div className="relative aspect-square w-full mb-6 overflow-hidden rounded-lg shadow-2xl border border-white/10">
                    <img 
                      src={tier.image} 
                      alt={tier.name} 
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Info */}
                  <h3 className="text-2xl font-bold mb-1">{tier.name}</h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-3xl font-mono text-white">${tier.usdPrice}</span>
                    <span className="text-xs text-gray-400">USD</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-8">{tier.desc}</p>

                  {/* Mint Button */}
                  <div className="mt-auto">
                    <TransactionButton
                      transaction={async () => {
                        // 1. Prepare Metadata
                        const metadata = {
                          name: nameInput,
                          description: `${tier.name} Name registered on NNM Protocol`,
                          image: tier.image, 
                          attributes: [
                            { trait_type: "Tier", value: tier.name },
                            { trait_type: "Registration Date", value: new Date().toISOString() }
                          ]
                        };
                        
                        // 2. Upload Metadata to IPFS
                        const uri = await upload({ client, files: [metadata] });

                        // 3. Determine Logic (Admin vs Public)
                        const isAdmin = account?.address === ownerAddress;
                        
                        if (isAdmin) {
                          // --- Admin Flow (Gas Only) ---
                          return prepareContractCall({
                            contract,
                            method: "function authorizedMint(string _name, uint8 _tier, string _tokenURI)",
                            params: [nameInput, tier.index, uri],
                          });

                        } else {
                          // --- Public Flow (Payment Required) ---
                          // Calculate Matic Cost dynamically from contract oracle
                          // Contract expects USD with 18 decimals (50 * 1e18)
                          const usdAmountWei = BigInt(tier.usdPrice) * BigInt(10**18);
                          
                          const costInMatic = await readContract({
                             contract,
                             method: "function getMaticCost(uint256 usdAmount) view returns (uint256)",
                             params: [usdAmountWei]
                          });

                          // Add a small buffer (1%) to prevent slippage/rounding errors
                          const valueToSend = (costInMatic * BigInt(101)) / BigInt(100);

                          return prepareContractCall({
                            contract,
                            method: "function mintPublic(string _name, uint8 _tier, string _tokenURI) payable",
                            params: [nameInput, tier.index, uri],
                            value: valueToSend, 
                          });
                        }
                      }}
                      onTransactionConfirmed={() => {
                        alert(`🎉 SUCCESS! Name "${nameInput}" has been minted.`);
                        setIsNameAvailable(false);
                        setNameInput("");
                      }}
                      onError={(err) => {
                        console.error(err);
                        alert("Transaction Failed. See console for details.");
                      }}
                      style={{
                        width: "100%",
                        backgroundColor: "white",
                        color: "black",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                      }}
                    >
                      {account?.address === ownerAddress ? "ADMIN MINT (FREE)" : "MINT NOW"}
                    </TransactionButton>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
