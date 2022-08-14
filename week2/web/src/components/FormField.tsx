type Props = {
	label?: string
	name?: string
	children: React.ReactNode
}

export default function FormField({ label, name, children }: Props) {
	return (
		<div className="flex">
			<div className="w-1/3">
				{label && <label htmlFor={name}>{label}:</label>}
			</div>
			<div className="w-2/3 flex items-start">{children}</div>
		</div>
	)
}
