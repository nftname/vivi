"use client";

import React, { useState } from "react";
import { client } from "@/consts/client";
import { defineChain, getContract, prepareContractCall, readContract } from "thirdweb";
import { TransactionButton, useActiveAccount, useReadContract } from "thirdweb/react";
import { upload } from "thirdweb/storage";
import { keccak256, toBytes } from "thirdweb/utils";
import { 
  Box, Flex, Heading, Text, Input, Button, Image, Badge, VStack, useToast, Container, SimpleGrid 
} from "@chakra-ui/react";

const CONTRACT_ADDRESS = "0x8e46c897bc74405922871a8a6863ccf5cd1fc721";
const CHAIN_ID = 137; 
const chain = defineChain(CHAIN_ID);

const contract = getContract({
  client: client,
  chain: chain,
  address: CONTRACT_ADDRESS,
});

const TIERS = [
  {
    index: 0,
    id: "IMMORTAL",
    name: "THE IMMORTAL",
    usdPrice: 50,
    image: "/images/tier-immortal.jpg", 
    borderColor: "yellow.600",
    bgGradient: "linear(to-b, #422006, black)",
    desc: "For Kings, Queens, AI, and 2-3 Letter Names.",
  },
  {
    index: 1,
    id: "ELITE",
    name: "THE ELITE",
    usdPrice: 30,
    image: "/images/tier-elite.jpg", 
    borderColor: "red.700",
    bgGradient: "linear(to-b, #450a0a, black)",
    desc: "For Powerful and Distinctive Names.",
  },
  {
    index: 2,
    id: "FOUNDER",
    name: "THE FOUNDER",
    usdPrice: 10,
    image: "/images/tier-founders.jpg", 
    borderColor: "cyan.600",
    bgGradient: "linear(to-b, #083344, black)",
    desc: "Entry level for Early Adopters.",
  },
];

export default function MintPage() {
  const account = useActiveAccount();
  const toast = useToast();
  
  const [nameInput, setNameInput] = useState("");
  const [isNameAvailable, setIsNameAvailable] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const { data: ownerAddress } = useReadContract({
    contract,
    method: "function owner() view returns (address)",
    params: [],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    setNameInput(val);
    setIsNameAvailable(null);
  };

  const checkAvailability = async () => {
    if (!nameInput || nameInput.length < 2) {
        toast({ title: "Name too short", status: "warning" });
        return;
    }
    setIsChecking(true);
    try {
      const nameHash = keccak256(toBytes(nameInput));
      const isRegistered = await readContract({
        contract,
        method: "function registeredNames(bytes32) view returns (bool)",
        params: [nameHash],
      });

      if (isRegistered) {
        setIsNameAvailable(false);
        toast({ title: "Name Taken", description: "Choose another name", status: "error" });
      } else {
        setIsNameAvailable(true);
        toast({ title: "Available!", description: "Select a tier below", status: "success" });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <Box minH="100vh" bg="black" color="white" pt="50px" pb="100px">
      <Container maxW="container.xl">
        
        <VStack spacing={4} mb={12} textAlign="center">
          <Heading size="3xl" bgGradient="linear(to-r, white, gray.500)" bgClip="text">
            MINT YOUR NAME
          </Heading>
          <Text fontSize="xl" color="gray.400">Create your sovereign identity on Polygon</Text>
          {account && ownerAddress === account.address && (
             <Badge colorScheme="red" variant="outline" p={2}>ADMIN MODE ACTIVE (Gas Only)</Badge>
          )}
        </VStack>

        <VStack maxW="600px" mx="auto" spacing={6} mb={16}>
            <Box w="full">
                <Input
                    value={nameInput}
                    onChange={handleInputChange}
                    placeholder="ENTER NAME (e.g. KING)"
                    size="lg"
                    textAlign="center"
                    fontSize="3xl"
                    fontWeight="bold"
                    h="80px"
                    borderColor="gray.700"
                    bg="gray.900"
                    _focus={{ borderColor: "white", boxShadow: "0 0 20px rgba(255,255,255,0.2)" }}
                    maxLength={40}
                />
                <Text mt={2} color="gray.500" fontSize="sm" textAlign="center">Allowed: A-Z, 0-9. No symbols.</Text>
            </Box>

            <Button 
                onClick={checkAvailability}
                isLoading={isChecking}
                isDisabled={!nameInput}
                size="lg"
                w="200px"
                colorScheme="whiteAlpha"
                variant="outline"
                _hover={{ bg: "white", color: "black" }}
            >
                CHECK AVAILABILITY
            </Button>

            {isNameAvailable === true && (
                <Text color="green.400" fontSize="lg" fontWeight="bold">✅ Name Available! Select Tier:</Text>
            )}
             {isNameAvailable === false && (
                <Text color="red.400" fontSize="lg" fontWeight="bold">❌ Name Taken. Try another.</Text>
            )}
        </VStack>

        {isNameAvailable && (
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
            {TIERS.map((tier) => (
              <Box
                key={tier.id}
                border="2px"
                borderColor={tier.borderColor}
                borderRadius="2xl"
                overflow="hidden"
                bgGradient={tier.bgGradient}
                transition="transform 0.2s"
                _hover={{ transform: "translateY(-10px)", boxShadow: "2xl" }}
                p={1}
              >
                <Box p={6} h="full" display="flex" flexDirection="column">
                  <Image 
                    src={tier.image} 
                    alt={tier.name} 
                    borderRadius="xl" 
                    mb={6} 
                    boxShadow="lg"
                    objectFit="cover"
                  />
                  
                  <Heading size="lg" mb={2}>{tier.name}</Heading>
                  <Flex alignItems="baseline" gap={2} mb={4}>
                    <Text fontSize="3xl" fontWeight="bold">${tier.usdPrice}</Text>
                    <Text fontSize="sm" color="gray.400">USD</Text>
                  </Flex>
                  <Text color="gray.300" mb={8} flex={1}>{tier.desc}</Text>

                  <Box mt="auto">
                    <TransactionButton
                      transaction={async () => {
                        const metadata = {
                          name: nameInput,
                          description: `${tier.name} Name registered on NNM Protocol`,
                          image: tier.image,
                          attributes: [{ trait_type: "Tier", value: tier.name }]
                        };
                        const uri = await upload({ client, files: [metadata] });
                        const isAdmin = account?.address === ownerAddress;
                        
                        if (isAdmin) {
                          return prepareContractCall({
                            contract,
                            method: "function authorizedMint(string _name, uint8 _tier, string _tokenURI)",
                            params: [nameInput, tier.index, uri],
                          });
                        } else {
                          const usdAmountWei = BigInt(tier.usdPrice) * BigInt(10**18);
                          const costInMatic = await readContract({
                             contract,
                             method: "function getMaticCost(uint256 usdAmount) view returns (uint256)",
                             params: [usdAmountWei]
                          });
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
                        toast({ title: "MINT SUCCESSFUL!", status: "success", duration: 5000 });
                        setIsNameAvailable(null);
                        setNameInput("");
                      }}
                      onError={(err) => {
                        console.error(err);
                        toast({ title: "Mint Failed", description: "Check console for details", status: "error" });
                      }}
                      style={{
                        width: "100%",
                        backgroundColor: "white",
                        color: "black",
                        fontWeight: "bold",
                        height: "50px",
                        borderRadius: "8px",
                      }}
                    >
                      {account?.address === ownerAddress ? "ADMIN MINT (FREE)" : "MINT NOW"}
                    </TransactionButton>
                  </Box>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        )}
      </Container>
    </Box>
  );
}
