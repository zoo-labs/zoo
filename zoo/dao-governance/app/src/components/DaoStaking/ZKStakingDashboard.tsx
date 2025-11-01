import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Flex,
  Grid,
  Text,
  Heading,
  Button,
  Input,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Badge,
  Card,
  CardBody,
  CardHeader,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Progress,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  VStack,
  HStack,
  Icon,
  useToast,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Tooltip,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import {
  Lock,
  LockOpen,
  TrendUp,
  Trophy,
  Timer,
  Coins,
  ChartLine,
  Users,
  Lightning,
  Wallet,
} from '@phosphor-icons/react';
import { useAccount, useBalance, useContractRead, useContractWrite } from 'wagmi';
import { formatUnits, parseUnits } from 'viem';
import { format, formatDistanceToNow, addSeconds } from 'date-fns';

// Import contract addresses from deployment file
import deployments from '/Users/z/work/zoo/zoo/contracts/deployments/localhost-zk-governance.json';

// Contract ABIs (simplified for demo)
const zkStakingABI = [
  {
    inputs: [
      { name: 'zooAmount', type: 'uint256' },
      { name: 'keeperAmount', type: 'uint256' },
      { name: 'lockDuration', type: 'uint256' },
    ],
    name: 'stake',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: 'stakeIndex', type: 'uint256' }],
    name: 'unstake',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: 'account', type: 'address' }],
    name: 'getStakes',
    outputs: [
      {
        components: [
          { name: 'zooAmount', type: 'uint256' },
          { name: 'keeperAmount', type: 'uint256' },
          { name: 'zkAmount', type: 'uint256' },
          { name: 'startTime', type: 'uint256' },
          { name: 'lockDuration', type: 'uint256' },
          { name: 'multiplier', type: 'uint256' },
          { name: 'isActive', type: 'bool' },
        ],
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getTotalVotingPower',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'account', type: 'address' }],
    name: 'getVotingPower',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
];

const erc20ABI = [
  {
    inputs: [{ name: 'spender', type: 'address' }, { name: 'amount', type: 'uint256' }],
    name: 'approve',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

interface StakeInfo {
  zooAmount: bigint;
  keeperAmount: bigint;
  zkAmount: bigint;
  startTime: bigint;
  lockDuration: bigint;
  multiplier: bigint;
  isActive: boolean;
}

export const ZKStakingDashboard: React.FC = () => {
  const { address, isConnected } = useAccount();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // State
  const [zooAmount, setZooAmount] = useState('');
  const [keeperAmount, setKeeperAmount] = useState('');
  const [lockDays, setLockDays] = useState(30);
  const [selectedStakeIndex, setSelectedStakeIndex] = useState<number | null>(null);

  // Read balances
  const { data: zooBalance } = useBalance({
    address,
    token: deployments.contracts.ZOO as `0x${string}`,
  });

  const { data: keeperBalance } = useBalance({
    address,
    token: deployments.contracts.KEEPER as `0x${string}`,
  });

  // Read staking data
  const { data: stakes, refetch: refetchStakes } = useContractRead({
    address: deployments.contracts.ZKStaking as `0x${string}`,
    abi: zkStakingABI,
    functionName: 'getStakes',
    args: address ? [address] : undefined,
    enabled: !!address,
  });

  const { data: votingPower } = useContractRead({
    address: deployments.contracts.ZKStaking as `0x${string}`,
    abi: zkStakingABI,
    functionName: 'getVotingPower',
    args: address ? [address] : undefined,
    enabled: !!address,
  });

  const { data: totalVotingPower } = useContractRead({
    address: deployments.contracts.ZKStaking as `0x${string}`,
    abi: zkStakingABI,
    functionName: 'getTotalVotingPower',
  });

  // Contract write functions
  const { write: approveZoo } = useContractWrite({
    address: deployments.contracts.ZOO as `0x${string}`,
    abi: erc20ABI,
    functionName: 'approve',
    onSuccess: () => {
      toast({
        title: 'ZOO Approved',
        description: 'You can now stake your ZOO tokens',
        status: 'success',
        duration: 3000,
      });
    },
  });

  const { write: approveKeeper } = useContractWrite({
    address: deployments.contracts.KEEPER as `0x${string}`,
    abi: erc20ABI,
    functionName: 'approve',
    onSuccess: () => {
      toast({
        title: 'KEEPER Approved',
        description: 'You can now stake your KEEPER tokens',
        status: 'success',
        duration: 3000,
      });
    },
  });

  const { write: stake } = useContractWrite({
    address: deployments.contracts.ZKStaking as `0x${string}`,
    abi: zkStakingABI,
    functionName: 'stake',
    onSuccess: () => {
      toast({
        title: 'Staking Successful',
        description: 'Your tokens have been staked and you received ZK tokens',
        status: 'success',
        duration: 5000,
      });
      refetchStakes();
      setZooAmount('');
      setKeeperAmount('');
    },
  });

  const { write: unstake } = useContractWrite({
    address: deployments.contracts.ZKStaking as `0x${string}`,
    abi: zkStakingABI,
    functionName: 'unstake',
    onSuccess: () => {
      toast({
        title: 'Unstaking Successful',
        description: 'Your tokens have been unstaked',
        status: 'success',
        duration: 5000,
      });
      refetchStakes();
      onClose();
    },
  });

  // Calculate ZK amount based on formula
  const calculateZKAmount = (zoo: string, keeper: string, days: number) => {
    if (!zoo || !keeper) return '0';
    try {
      const zooAmountBN = parseUnits(zoo, 18);
      const keeperAmountBN = parseUnits(keeper, 18);
      const multiplier = 100n + BigInt(Math.floor(days / 30) * 10); // 10% per 30 days
      const zkAmount = ((zooAmountBN + keeperAmountBN) * multiplier) / 100n;
      return formatUnits(zkAmount, 18);
    } catch {
      return '0';
    }
  };

  const zkToReceive = useMemo(
    () => calculateZKAmount(zooAmount, keeperAmount, lockDays),
    [zooAmount, keeperAmount, lockDays]
  );

  // Calculate voting power rank
  const votingPowerRank = useMemo(() => {
    if (!votingPower || !totalVotingPower || totalVotingPower === 0n) return 0;
    return Number((votingPower * 10000n) / totalVotingPower) / 100; // Percentage
  }, [votingPower, totalVotingPower]);

  const handleApproveAndStake = async () => {
    if (!zooAmount || !keeperAmount) {
      toast({
        title: 'Invalid amounts',
        description: 'Please enter valid amounts for both ZOO and KEEPER',
        status: 'error',
        duration: 3000,
      });
      return;
    }

    try {
      const zooAmountBN = parseUnits(zooAmount, 18);
      const keeperAmountBN = parseUnits(keeperAmount, 18);
      const lockSeconds = lockDays * 24 * 60 * 60;

      // Approve ZOO
      await approveZoo({
        args: [deployments.contracts.ZKStaking as `0x${string}`, zooAmountBN],
      });

      // Approve KEEPER
      await approveKeeper({
        args: [deployments.contracts.ZKStaking as `0x${string}`, keeperAmountBN],
      });

      // Stake
      await stake({
        args: [zooAmountBN, keeperAmountBN, BigInt(lockSeconds)],
      });
    } catch (error) {
      console.error('Staking error:', error);
      toast({
        title: 'Staking failed',
        description: 'Please check your balances and try again',
        status: 'error',
        duration: 5000,
      });
    }
  };

  const handleUnstake = (index: number) => {
    setSelectedStakeIndex(index);
    onOpen();
  };

  const confirmUnstake = () => {
    if (selectedStakeIndex !== null) {
      unstake({ args: [BigInt(selectedStakeIndex)] });
    }
  };

  return (
    <Box p={6}>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <Flex justify="space-between" align="center">
          <VStack align="start" spacing={1}>
            <Heading size="lg" color="white">
              ZK Staking Dashboard
            </Heading>
            <Text color="gray.400">
              Stake ZOO + KEEPER → Get ZK governance tokens
            </Text>
          </VStack>
          <Badge colorScheme="green" fontSize="md" p={2}>
            <Icon as={Lightning} mr={1} />
            Network: Localhost
          </Badge>
        </Flex>

        {/* Stats Cards */}
        <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={4}>
          <Card bg="gray.800" borderColor="gray.700" borderWidth={1}>
            <CardBody>
              <Stat>
                <StatLabel color="gray.400">
                  <HStack>
                    <Icon as={Wallet} />
                    <Text>ZOO Balance</Text>
                  </HStack>
                </StatLabel>
                <StatNumber color="white">
                  {zooBalance ? formatUnits(zooBalance.value, 18).slice(0, 10) : '0'} ZOO
                </StatNumber>
                <StatHelpText color="gray.500">Available to stake</StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card bg="gray.800" borderColor="gray.700" borderWidth={1}>
            <CardBody>
              <Stat>
                <StatLabel color="gray.400">
                  <HStack>
                    <Icon as={Coins} />
                    <Text>KEEPER Balance</Text>
                  </HStack>
                </StatLabel>
                <StatNumber color="white">
                  {keeperBalance ? formatUnits(keeperBalance.value, 18).slice(0, 10) : '0'} KEEPER
                </StatNumber>
                <StatHelpText color="gray.500">Available to stake</StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card bg="gray.800" borderColor="gray.700" borderWidth={1}>
            <CardBody>
              <Stat>
                <StatLabel color="gray.400">
                  <HStack>
                    <Icon as={TrendUp} />
                    <Text>Your Voting Power</Text>
                  </HStack>
                </StatLabel>
                <StatNumber color="white">
                  {votingPower ? formatUnits(votingPower as bigint, 18).slice(0, 10) : '0'} ZK
                </StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  {votingPowerRank.toFixed(2)}% of total
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card bg="gray.800" borderColor="gray.700" borderWidth={1}>
            <CardBody>
              <Stat>
                <StatLabel color="gray.400">
                  <HStack>
                    <Icon as={Trophy} />
                    <Text>Voting Power Rank</Text>
                  </HStack>
                </StatLabel>
                <StatNumber color="yellow.400">
                  #{votingPowerRank > 0 ? Math.ceil(100 / votingPowerRank) : 'N/A'}
                </StatNumber>
                <StatHelpText color="gray.500">
                  Top {votingPowerRank > 0 ? Math.min(100, Math.ceil(votingPowerRank)) : '100'}%
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </Grid>

        {/* Tabs */}
        <Tabs colorScheme="blue" variant="enclosed">
          <TabList>
            <Tab _selected={{ bg: 'gray.700', color: 'white' }} color="gray.400">
              <Icon as={Lock} mr={2} />
              New Stake
            </Tab>
            <Tab _selected={{ bg: 'gray.700', color: 'white' }} color="gray.400">
              <Icon as={ChartLine} mr={2} />
              Active Stakes
            </Tab>
            <Tab _selected={{ bg: 'gray.700', color: 'white' }} color="gray.400">
              <Icon as={Users} mr={2} />
              Leaderboard
            </Tab>
          </TabList>

          <TabPanels>
            {/* New Stake Tab */}
            <TabPanel>
              <Card bg="gray.800" borderColor="gray.700" borderWidth={1}>
                <CardHeader>
                  <Heading size="md" color="white">
                    Create New Stake
                  </Heading>
                </CardHeader>
                <CardBody>
                  <VStack spacing={6}>
                    <Grid templateColumns="repeat(2, 1fr)" gap={4} w="full">
                      <Box>
                        <Text color="gray.400" mb={2}>
                          ZOO Amount
                        </Text>
                        <Input
                          placeholder="0.0"
                          value={zooAmount}
                          onChange={(e) => setZooAmount(e.target.value)}
                          bg="gray.900"
                          borderColor="gray.600"
                          color="white"
                          _placeholder={{ color: 'gray.500' }}
                          _focus={{ borderColor: 'blue.500' }}
                        />
                        <Text fontSize="sm" color="gray.500" mt={1}>
                          Max: {zooBalance ? formatUnits(zooBalance.value, 18).slice(0, 10) : '0'}
                        </Text>
                      </Box>

                      <Box>
                        <Text color="gray.400" mb={2}>
                          KEEPER Amount
                        </Text>
                        <Input
                          placeholder="0.0"
                          value={keeperAmount}
                          onChange={(e) => setKeeperAmount(e.target.value)}
                          bg="gray.900"
                          borderColor="gray.600"
                          color="white"
                          _placeholder={{ color: 'gray.500' }}
                          _focus={{ borderColor: 'blue.500' }}
                        />
                        <Text fontSize="sm" color="gray.500" mt={1}>
                          Max: {keeperBalance ? formatUnits(keeperBalance.value, 18).slice(0, 10) : '0'}
                        </Text>
                      </Box>
                    </Grid>

                    <Box w="full">
                      <Flex justify="space-between" mb={2}>
                        <Text color="gray.400">Lock Duration</Text>
                        <Text color="white" fontWeight="bold">
                          {lockDays} days
                        </Text>
                      </Flex>
                      <Slider
                        value={lockDays}
                        onChange={setLockDays}
                        min={1}
                        max={365}
                        step={1}
                        colorScheme="blue"
                      >
                        <SliderTrack bg="gray.700">
                          <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb boxSize={6} bg="blue.500">
                          <Icon as={Timer} color="white" />
                        </SliderThumb>
                      </Slider>
                      <Flex justify="space-between" mt={1}>
                        <Text fontSize="xs" color="gray.500">
                          1 day
                        </Text>
                        <Text fontSize="xs" color="gray.500">
                          365 days
                        </Text>
                      </Flex>
                    </Box>

                    <Box w="full" p={4} bg="gray.900" borderRadius="md">
                      <Flex justify="space-between" mb={2}>
                        <Text color="gray.400">You will receive</Text>
                        <Text color="green.400" fontSize="xl" fontWeight="bold">
                          {zkToReceive} ZK
                        </Text>
                      </Flex>
                      <Flex justify="space-between">
                        <Text fontSize="sm" color="gray.500">
                          Lock bonus
                        </Text>
                        <Text fontSize="sm" color="gray.400">
                          {Math.floor(lockDays / 30) * 10}%
                        </Text>
                      </Flex>
                    </Box>

                    <Button
                      colorScheme="blue"
                      size="lg"
                      w="full"
                      onClick={handleApproveAndStake}
                      isDisabled={!isConnected || !zooAmount || !keeperAmount}
                      leftIcon={<Icon as={Lock} />}
                    >
                      {isConnected ? 'Approve & Stake' : 'Connect Wallet'}
                    </Button>
                  </VStack>
                </CardBody>
              </Card>
            </TabPanel>

            {/* Active Stakes Tab */}
            <TabPanel>
              <Card bg="gray.800" borderColor="gray.700" borderWidth={1}>
                <CardHeader>
                  <Heading size="md" color="white">
                    Your Active Stakes
                  </Heading>
                </CardHeader>
                <CardBody>
                  {stakes && (stakes as StakeInfo[]).length > 0 ? (
                    <TableContainer>
                      <Table variant="simple">
                        <Thead>
                          <Tr>
                            <Th color="gray.400">ZOO</Th>
                            <Th color="gray.400">KEEPER</Th>
                            <Th color="gray.400">ZK Received</Th>
                            <Th color="gray.400">Lock End</Th>
                            <Th color="gray.400">Status</Th>
                            <Th color="gray.400">Action</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {(stakes as StakeInfo[]).map((stake, index) => {
                            const unlockTime = new Date(
                              Number(stake.startTime + stake.lockDuration) * 1000
                            );
                            const isUnlocked = Date.now() > unlockTime.getTime();

                            return (
                              <Tr key={index}>
                                <Td color="white">
                                  {formatUnits(stake.zooAmount, 18).slice(0, 10)}
                                </Td>
                                <Td color="white">
                                  {formatUnits(stake.keeperAmount, 18).slice(0, 10)}
                                </Td>
                                <Td color="green.400">
                                  {formatUnits(stake.zkAmount, 18).slice(0, 10)}
                                </Td>
                                <Td color="white">
                                  <Tooltip label={format(unlockTime, 'PPpp')}>
                                    <Text>{formatDistanceToNow(unlockTime)}</Text>
                                  </Tooltip>
                                </Td>
                                <Td>
                                  <Badge colorScheme={isUnlocked ? 'green' : 'yellow'}>
                                    {isUnlocked ? 'Unlocked' : 'Locked'}
                                  </Badge>
                                </Td>
                                <Td>
                                  <Button
                                    size="sm"
                                    colorScheme={isUnlocked ? 'green' : 'gray'}
                                    onClick={() => handleUnstake(index)}
                                    isDisabled={!isUnlocked || !stake.isActive}
                                    leftIcon={<Icon as={LockOpen} />}
                                  >
                                    Unstake
                                  </Button>
                                </Td>
                              </Tr>
                            );
                          })}
                        </Tbody>
                      </Table>
                    </TableContainer>
                  ) : (
                    <Text color="gray.500" textAlign="center" py={8}>
                      No active stakes yet. Create your first stake to start earning voting power!
                    </Text>
                  )}
                </CardBody>
              </Card>
            </TabPanel>

            {/* Leaderboard Tab */}
            <TabPanel>
              <Card bg="gray.800" borderColor="gray.700" borderWidth={1}>
                <CardHeader>
                  <Heading size="md" color="white">
                    Voting Power Leaderboard
                  </Heading>
                </CardHeader>
                <CardBody>
                  <VStack spacing={4}>
                    <Text color="gray.400" textAlign="center">
                      Top ZK holders by voting power
                    </Text>
                    <Progress
                      value={votingPowerRank}
                      colorScheme="yellow"
                      size="lg"
                      w="full"
                      borderRadius="md"
                    />
                    <Text color="white" fontSize="lg">
                      Your Position: #{votingPowerRank > 0 ? Math.ceil(100 / votingPowerRank) : 'N/A'}
                    </Text>
                    <Text color="gray.500" fontSize="sm" textAlign="center">
                      Leaderboard data will be populated as more users stake
                    </Text>
                  </VStack>
                </CardBody>
              </Card>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>

      {/* Unstake Confirmation Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay bg="blackAlpha.700" />
        <ModalContent bg="gray.800" borderColor="gray.700" borderWidth={1}>
          <ModalHeader color="white">Confirm Unstaking</ModalHeader>
          <ModalCloseButton color="gray.400" />
          <ModalBody>
            <Text color="gray.300">
              Are you sure you want to unstake? You will receive your ZOO and KEEPER tokens back,
              but you will lose your ZK voting power.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose} color="gray.400">
              Cancel
            </Button>
            <Button colorScheme="red" onClick={confirmUnstake}>
              Unstake
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ZKStakingDashboard;