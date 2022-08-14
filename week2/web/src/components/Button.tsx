type ButtonProps = React.DetailedHTMLProps<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
>

type Props = Omit<ButtonProps, "className" | "style">

export default function Button(props: Props) {
	return (
		<button
			{...props}
			className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
		/>
	)
}
