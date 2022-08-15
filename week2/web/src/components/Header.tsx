type Props = {
	as: `h${1 | 2 | 3 | 4 | 5 | 6}`
	children: React.ReactNode
}

export default function Header({ as: Heading, children }: Props) {
	return (
		<header className="mt-10 p-4 text-center border-slate-600 bg-slate-800 border-2">
			<Heading className="text-3xl">{children}</Heading>
		</header>
	)
}
