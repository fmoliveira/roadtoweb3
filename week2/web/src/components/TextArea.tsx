import { useFormContext } from "react-hook-form"
import { inputClassNames } from "./Input"

type TextAreaProps = React.DetailedHTMLProps<
	React.TextareaHTMLAttributes<HTMLTextAreaElement>,
	HTMLTextAreaElement
>

type Props = Omit<TextAreaProps, "className" | "style"> & {
	name: string
}

export default function TextArea({ name, ...props }: Props) {
	const { register } = useFormContext()

	return (
		<textarea
			className={inputClassNames}
			{...props}
			{...register(name)}
		></textarea>
	)
}
