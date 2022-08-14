import { ethers } from "hardhat"

async function main() {
	const contractFactory = await ethers.getContractFactory("BuyMeACoffee")
	const contract = await contractFactory.deploy()
	await contract.deployed()
	console.log("== contract deployed to", contract.address)
}

main().catch((error) => {
	console.error(error)
	process.exitCode = 1
})
