import { useFormContext } from "react-hook-form"
import { getInputClassNames } from "./Input"

type TextAreaProps = React.DetailedHTMLProps<
	React.TextareaHTMLAttributes<HTMLTextAreaElement>,
	HTMLTextAreaElement
>

type Props = Omit<TextAreaProps, "className" | "style"> & {
	name: string
}

export default function TextArea({ name, ...props }: Props) {
	const { register, formState } = useFormContext()
	const hasError: boolean = formState.errors[name]?.message !== undefined

	return (
		<textarea
			className={getInputClassNames(hasError)}
			{...props}
			{...register(name)}
		></textarea>
	)
}
