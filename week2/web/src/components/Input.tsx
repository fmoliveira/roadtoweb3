import { useFormContext } from "react-hook-form"

type InputProps = React.DetailedHTMLProps<
	React.InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
>

type Props = Omit<InputProps, "className" | "style"> & {
	name: string
}

export const inputClassNames =
	"bg-slate-600 border-slate-500 text-slate-200 appearance-none border-2 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-slate-700 focus:border-indigo-400"

export default function Input({ name, type = "text", ...props }: Props) {
	const { register } = useFormContext()

	return (
		<input
			className={inputClassNames}
			type={type}
			{...props}
			{...register(name)}
		/>
	)
}
