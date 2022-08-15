type Props = {
	_id: string
	timestamp: Date
	address: string
	name: string
	message: string
}

export default function Memo({ name, timestamp, message }: Props) {
	console.log({ timestamp })
	return (
		<div className="p-4 bg-slate-800">
			<strong>{name}</strong>{" "}
			<small>
				(<time>{timestamp.toString()}</time>)
			</small>
			<blockquote className="mt-2 py-2 pl-4 border-l-2 border-indigo-500">
				{message}
			</blockquote>
		</div>
	)
}
