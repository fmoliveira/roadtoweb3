import { ethers } from "ethers"
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

type CoffeeQueries = {
	address: string
	network: string
	status: CoffeeStatus
}

type CoffeeMutations = {
	connect: () => void
}

type CoffeeApi = [CoffeeQueries, CoffeeMutations]

export default function useCoffeeApi(contractAddress: string): CoffeeApi {
	const provider = new ethers.providers.Web3Provider(window.ethereum)
	const contract = new ethers.Contract(
		contractAddress,
		BuyMeACoffee.abi,
		provider
	)

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

	const queries = { address, network, status }

	const mutations = {
		connect: async () => {
			try {
				setAddress(await connectWallet())
				setStatus(CoffeeStatus.CONNECTED)
			} catch {
				setStatus(CoffeeStatus.ERROR_CONNECT_WALLET)
			}
		},
	}

	return [queries, mutations]
}

function getProvider(): ethers.providers.Web3Provider {
	return new ethers.providers.Web3Provider(window.ethereum)
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
