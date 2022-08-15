import { FormProvider, useForm } from "react-hook-form"

import Button from "./Button"
import Form from "./Form"
import FormField from "./FormField"
import Input from "./Input"
import TextArea from "./TextArea"

type Props = {
	onBuyCoffee: (values: FormData) => void
}

type FormData = {
	name: string
	message: string
	value: number
}

export default function BuyCoffee({ onBuyCoffee }: Props) {
	const form = useForm<FormData>()

	return (
		<FormProvider {...form}>
			<Form onSubmit={form.handleSubmit(onBuyCoffee)}>
				<FormField name="name" label="Your name">
					<Input name="name" required={true} />
				</FormField>
				<FormField name="value" label="Tip amount">
					<Input name="value" type="number" required={true} />
				</FormField>
				<FormField name="message" label="Your message">
					<TextArea name="message" required={true} />
				</FormField>
				<FormField>
					<Button type="submit">☕️ Buy Coffee</Button>
				</FormField>
			</Form>
		</FormProvider>
	)
}
