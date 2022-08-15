import { CoffeeStatus } from "../hooks/useCoffeeApi"
import Button from "./Button"

type Props = {
	address: string
	network: string
	status: CoffeeStatus
	onConnect: () => void
}

export default function Wallet({ address, network, status, onConnect }: Props) {
	return (
		<div className="p-4 text-center flex flex-col gap-2">
			{network?.length > 0 && network !== "goerli" && (
				<div className="p-2 text-red-400 font-bold">
					Please switch your network to Goerli.
				</div>
			)}
			<p>Address: {address}</p>
			<p>Network: {network}</p>
			<p>Status: {status}</p>
			{status !== CoffeeStatus.CONNECTED && (
				<div>
					<Button type="button" onClick={onConnect}>
						Connect
					</Button>
				</div>
			)}
		</div>
	)
}
