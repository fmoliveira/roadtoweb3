import Memo from "./Memo"

type MemoProps = React.ComponentProps<typeof Memo>

type Props = {
	memos: MemoProps[] | undefined
}

export default function Guestbook({ memos }: Props) {
	return (
		<div className="flex flex-col gap-4 py-4">
			{memos?.length === 0 && (
				<p className="m-8 text-center">No messages yet.</p>
			)}
			{memos?.map((memo) => (
				<Memo key={memo._id} {...memo} />
			))}
		</div>
	)
}
