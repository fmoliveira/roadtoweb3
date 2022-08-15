import { useEffect } from "react"
import { FormProvider, useForm } from "react-hook-form"

import Button from "./Button"
import Form from "./Form"
import FormField from "./FormField"
import Input from "./Input"
import TextArea from "./TextArea"

type Props = {
	isLoading?: boolean
	isSuccess?: boolean
	onBuyCoffee: (values: FormData) => void
}

type FormData = {
	name: string
	message: string
	value: number
}

export default function BuyCoffee({
	isLoading,
	isSuccess,
	onBuyCoffee,
}: Props) {
	const form = useForm<FormData>()

	useEffect(() => {
		if (isSuccess) {
			form.reset()
		}
	}, [isSuccess])

	return (
		<FormProvider {...form}>
			<Form onSubmit={form.handleSubmit(onBuyCoffee)}>
				<FormField name="name" label="Your name">
					<Input name="name" required={true} disabled={isLoading} />
				</FormField>
				<FormField name="message" label="Your message">
					<TextArea name="message" required={true} disabled={isLoading} />
				</FormField>
				<FormField name="value" label="Tip amount">
					<Input
						name="value"
						type="number"
						min={0.001}
						step={0.001}
						required={true}
						defaultValue={0.001}
						disabled={isLoading}
					/>
				</FormField>
				<FormField>
					<Button type="submit" disabled={isLoading}>
						{!isLoading && "☕️ Buy Coffee"}
						{isLoading && "Please wait..."}
					</Button>
				</FormField>
			</Form>
		</FormProvider>
	)
}
