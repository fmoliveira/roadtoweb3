import { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"

require("dotenv").config()

const GOERLI_URL: string = process.env.GOERLI_URL!
const PRIVATE_KEY: string = process.env.PRIVATE_KEY!

const config: HardhatUserConfig = {
	solidity: "0.8.9",
	networks: {
		goerli: {
			url: GOERLI_URL,
			accounts: [PRIVATE_KEY],
		},
	},
}

export default config
