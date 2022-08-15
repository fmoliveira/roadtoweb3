type FormProps = React.DetailedHTMLProps<
	React.FormHTMLAttributes<HTMLFormElement>,
	HTMLFormElement
>

type Props = Omit<FormProps, "className" | "style">

export default function Form({ onSubmit, children }: Props) {
	return (
		<form
			className="mx-auto p-4 w-full max-w-lg flex flex-col gap-3"
			onSubmit={onSubmit}
		>
			{children}
		</form>
	)
}
