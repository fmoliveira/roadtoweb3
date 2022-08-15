import { FormProvider, useForm } from "react-hook-form"

import Button from "./Button"
import FormField from "./FormField"
import Input from "./Input"
import TextArea from "./TextArea"

type Props = {
	onBuyCoffee: (name: string, message: string, value: number) => void
}

type FormData = {
	name: string
	message: string
	value: number
}

export default function BuyCoffee({ onBuyCoffee }: Props) {
	const form = useForm<FormData>()
	const { handleSubmit } = form
	const onSubmit = ({ name, message, value }: FormData) => {
		onBuyCoffee(name, message, value)
	}

	return (
		<FormProvider {...form}>
			<form
				className="mx-auto p-4 w-full max-w-lg flex flex-col gap-3"
				onSubmit={handleSubmit(onSubmit)}
			>
				<FormField name="name" label="Your name">
					<Input name="name" />
				</FormField>
				<FormField name="value" label="Tip amount">
					<Input name="value" type="number" />
				</FormField>
				<FormField name="message" label="Your message">
					<TextArea name="message" />
				</FormField>
				<FormField>
					<Button type="submit">☕️ Buy Coffee</Button>
				</FormField>
			</form>
		</FormProvider>
	)
}
