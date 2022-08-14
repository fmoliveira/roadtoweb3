import { BigNumber, BigNumberish } from "ethers"
import { ethers } from "hardhat"

async function main() {
	// get example accounts
	const [owner, tipper, tipper2, tipper3] = await ethers.getSigners()

	// deploy the contract
	const contractFactory = await ethers.getContractFactory("BuyMeACoffee")
	const contract = await contractFactory.deploy()
	await contract.deployed()
	console.log("== contract deployed to", contract.address)

	// check balances before the coffee purchase
	const addresses = [contract.address, owner.address, tipper.address]
	console.log("== start")
	printBalances(addresses)

	// buy the owner a few coffees
	const tip: Payment = { value: ethers.utils.parseEther("1") }
	await contract.connect(tipper).buyCoffee("Louis", "Enjoy!", tip)
	await contract.connect(tipper2).buyCoffee("Marie", "Enchanté!", tip)
	await contract.connect(tipper3).buyCoffee("Link", "Take this!", tip)

	// check balances after the coffee purchase
	printBalances(addresses)

	// withdraw funds
	await contract.connect(owner).withdrawTips()

	// check balances after the withdrawal
	printBalances(addresses)

	// read all the memos left for the owner
	const memos: Memo[] = await contract.getMemos()
	console.table
	printMemos(memos)
}

main().catch((error) => {
	console.error(error)
	process.exitCode = 1
})

async function getBalance(address: string) {
	const balance = await ethers.provider.getBalance(address)
	return ethers.utils.formatEther(balance)
}

async function printBalances(addresses: string[]) {
	const table = []
	for (const address of addresses) {
		table.push({
			address,
			balance: await getBalance(address),
		})
	}
	console.table(table)
}

async function printMemos(memos: Memo[]) {
	for (const memo of memos) {
		const { timestamp, name, from, message } = memo
		console.log("memo", { timestamp, name, from, message })
	}
}

type Payment = {
	value: BigNumberish
}

type Memo = {
	from: string
	timestamp: BigNumber
	name: string
	message: string
}
