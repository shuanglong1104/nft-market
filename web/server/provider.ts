import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

// rpc 

export const provider = createPublicClient({
  chain: mainnet,
  transport: http("https://eth-mainnet.g.alchemy.com/v2/iIXO9lqosmQABnPyVYfZmrRm1bT8E3sb"),
})
