import axios from "axios"
import * as solanaWeb3 from "@solana/web3.js"

import { MORALIS_API_KEY, ALCHEMY_API_KEY } from "../config"

export const getConnection = (rpcUrl: string) => {
    return new solanaWeb3.Connection(rpcUrl)
}

export const getSplBalanceMoralis = async (account: string, tokenAddress: string, network?: "mainnet" | "devnet") => {
    try {
        const response = await axios.get(
            `https://solana-gateway.moralis.io/account/${network || "mainnet"}/${account}/tokens`,
            {
                headers: {
                    'X-API-Key': MORALIS_API_KEY
                }
            }
        )

        const token = response.data.filter((token: any) => ( token.mint === tokenAddress ))

        if(token.lenth === 0 ) {
            return 0
        }
        else {
            return token[0]['amount']
        }
    }
    catch(error) {
        throw error
    }
}

export const getSplBalanceAlchemy = async (account: string, tokenAddress: string) => {
    try {
        const data = {
            method: "getTokenAccountsByOwner",
            id: "1",
            jsonrpc: "2.0",
            params: [
                account,
                {
                    mint: tokenAddress
                },
                {
                    "encoding": "jsonParsed"
                }
            ]
        }
        const response = await axios.post(`https://solana-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`, data)

        if(response.data?.result?.value?.length === 0) {
            return 0
        }
        else {
            return response.data?.result?.value[0]?.account?.data?.parsed?.info?.tokenAmount?.uiAmount
        }

    }
    catch(error) {
        throw error
    }
}