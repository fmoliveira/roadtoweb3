import { useQuery, useMutation } from "@tanstack/react-query"

import BuyCoffee from "./components/BuyCoffee"
import Guestbook from "./components/Guestbook"
import Header from "./components/Header"
import Layout from "./components/Layout"
import Wallet from "./components/Wallet"
import useCoffeeApi, { CoffeeStatus } from "./hooks/useCoffeeApi"

const CONTRACT_ADDRESS: string = "0xdC743fb62977B1b3b69459CA9797CDB01e733c31"

export default function App() {
	const [queries, mutations] = useCoffeeApi(CONTRACT_ADDRESS)
	const { data } = useQuery(
		[
			"memos",
			queries.address,
			queries.network,
			queries.status,
			queries.lastUpdate,
		],
		queries.getMemos,
	)
	const buyCoffee = useMutation(mutations.buyCoffee)

	return (
		<Layout>
			<Header as="h1">Buy Filipe a coffee :)</Header>
			<Wallet
				address={queries.address}
				network={queries.network}
				status={queries.status}
				onConnect={mutations.connect}
			/>
			{queries.status === CoffeeStatus.CONNECTED && (
				<BuyCoffee
					isLoading={buyCoffee.isLoading}
					isSuccess={buyCoffee.isSuccess}
					onBuyCoffee={(values) => buyCoffee.mutate(values)}
				/>
			)}
			<Header as="h2">My Guestbook</Header>
			<Guestbook memos={data} />
		</Layout>
	)
}
