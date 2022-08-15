import { useFormContext } from "react-hook-form"

type InputProps = React.DetailedHTMLProps<
	React.InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
>

type Props = Omit<InputProps, "className" | "style"> & {
	name: string
}

export const getInputClassNames = (hasError?: boolean) =>
	[
		"bg-slate-600 border-slate-500 text-slate-200",
		"appearance-none border-2 rounded w-full py-2 px-4 leading-tight",
		"focus:outline-none focus:bg-slate-700 focus:border-indigo-400",
		"disabled:opacity-50 disabled:pointer-events-none",
		hasError && "border-red-500",
	]
		.filter(Boolean)
		.join(" ")

export default function Input({
	name,
	required,
	type = "text",
	...props
}: Props) {
	const { register, formState } = useFormContext()
	const hasError: boolean = formState.errors[name]?.message !== undefined

	return (
		<input
			className={getInputClassNames(hasError)}
			type={type}
			required={required}
			{...props}
			{...register(name, { required })}
		/>
	)
}
