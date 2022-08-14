import Header from "./components/Header"
import Layout from "./components/Layout"
import Wallet from "./components/Wallet"
import useCoffeeApi from "./hooks/useCoffeeApi"

const CONTRACT_ADDRESS: string = "0xdC743fb62977B1b3b69459CA9797CDB01e733c31"

export default function App() {
	const [queries, mutations] = useCoffeeApi(CONTRACT_ADDRESS)

	return (
		<Layout>
			<Header />
			<Wallet
				address={queries.address}
				network={queries.network}
				status={queries.status}
				onConnect={mutations.connect}
			/>
		</Layout>
	)
}
