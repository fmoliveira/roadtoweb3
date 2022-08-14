import { useForm } from "react-hook-form"

import Button from "./Button"
import FormField from "./FormField"

type Props = {
	onBuyCoffee: (name: string, message: string, value: number) => void
}

type FormData = {
	name: string
	message: string
	value: number
}

export default function BuyCoffee({ onBuyCoffee }: Props) {
	const { register, handleSubmit } = useForm<FormData>()
	const onSubmit = ({ name, message, value }: FormData) => {
		onBuyCoffee(name, message, value)
	}

	return (
		<form
			className="mx-auto p-4 w-full max-w-lg flex flex-col gap-3"
			onSubmit={handleSubmit(onSubmit)}
		>
			<FormField name="name" label="Your name">
				<input className="w-full" type="text" {...register("name")} />
			</FormField>
			<FormField name="value" label="Tip amount">
				<input className="w-full" type="text" {...register("value")} />
			</FormField>
			<FormField name="message" label="Your message">
				<textarea className="w-full" {...register("message")}></textarea>
			</FormField>
			<FormField>
				<Button type="submit">☕️ Buy Coffee</Button>
			</FormField>
		</form>
	)
}
