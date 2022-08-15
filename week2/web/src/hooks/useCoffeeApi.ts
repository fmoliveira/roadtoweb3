import { ethers, providers } from "ethers"
import { useEffect, useState } from "react"

import BuyMeACoffee from "../data/BuyMeACoffee.json"
import useWindowFocus from "./useWindowFocus"

declare global {
	interface Window {
		ethereum: ethers.providers.ExternalProvider
	}
}

export enum CoffeeStatus {
	NOT_CONNECTED = "NOT_CONNECTED",
	ERROR_CONNECT_WALLET = "ERROR_CONNECT_WALLET",
	CONNECTED = "CONNECTED",
}

type Memo = {
	_id: string
	timestamp: Date
	address: string
	name: string
	message: string
}

type CoffeeQueries = {
	address: string
	network: string
	status: CoffeeStatus
	getMemos: () => Promise<Memo[]>
}

type BuyCoffeeParams = { name: string; message: string; value: number }

type CoffeeMutations = {
	connect: () => void
	buyCoffee: (params: BuyCoffeeParams) => void
}

type CoffeeApi = [CoffeeQueries, CoffeeMutations]

export default function useCoffeeApi(contractAddress: string): CoffeeApi {
	const [address, setAddress] = useState("")
	const [network, setNetwork] = useState("")
	const [status, setStatus] = useState(CoffeeStatus.NOT_CONNECTED)

	const isWindowFocused = useWindowFocus()
	useEffect(() => {
		if (isWindowFocused) {
			getAddress().then(setAddress)
			getNetwork().then(setNetwork)
		}
	}, [isWindowFocused])

	const getMemos = (): Promise<Memo[]> => {
		return getContract(contractAddress)
			.getMemos()
			.then((memos: Array<Record<string, any>>) => {
				return memos
					.map((memo: Record<string, any>) => ({
						...memo,
						_id: [memo.address, memo.timestamp.toString()].join("_"),
						timestamp: new Date(
							Number.parseInt(memo.timestamp.toString(), 10) * 1000,
						),
					}))
					.reverse()
			})
	}

	const queries = { address, network, status, getMemos }

	const mutations = {
		connect: async () => {
			try {
				setAddress(await connectWallet())
				setStatus(CoffeeStatus.CONNECTED)
			} catch {
				setStatus(CoffeeStatus.ERROR_CONNECT_WALLET)
			}
		},
		buyCoffee: async ({ name, message, value }: BuyCoffeeParams) => {
			if (value < 0) {
				throw new Error("Tip value must be positive")
			}
			const transaction = await getWritableContract(contractAddress).buyCoffee(
				name,
				message,
				{
					value: ethers.utils.parseEther(value.toString()),
				},
			)
			await transaction.wait()
		},
	}

	return [queries, mutations]
}

function getProvider(): ethers.providers.Web3Provider {
	return new ethers.providers.Web3Provider(window.ethereum)
}

function getContract(
	contractAddress: string,
	provider: ethers.providers.Provider = getProvider(),
): ethers.Contract {
	return new ethers.Contract(contractAddress, BuyMeACoffee.abi, provider)
}

function getWritableContract(
	contractAddress: string,
	provider: ethers.providers.JsonRpcProvider = getProvider(),
): ethers.Contract {
	return new ethers.Contract(
		contractAddress,
		BuyMeACoffee.abi,
		provider.getSigner(),
	)
}

async function getAddress(): Promise<string> {
	const accounts: string[] = await window.ethereum.request!({
		method: "eth_accounts",
	})
	if (!accounts || !Array.isArray(accounts) || accounts.length === 0) {
		throw new Error("Cannot connect to wallet")
	}
	return accounts[0]
}

async function getNetwork(): Promise<string> {
	const network: ethers.providers.Network = await getProvider().getNetwork()
	return network.name
}

async function connectWallet(): Promise<string> {
	const accounts: string[] = await window.ethereum.request!({
		method: "eth_requestAccounts",
	})
	if (!accounts || !Array.isArray(accounts) || accounts.length === 0) {
		throw new Error("Cannot connect to wallet")
	}
	return accounts[0]
}
