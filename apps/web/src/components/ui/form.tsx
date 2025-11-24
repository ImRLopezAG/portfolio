/** biome-ignore-all lint/suspicious/noExplicitAny:  Any for the context */

import { cn } from '@lib/utils'
import type * as LabelPrimitive from '@radix-ui/react-label'
import { Slot } from '@radix-ui/react-slot'
import { Loader2 } from 'lucide-react'
import * as React from 'react'
import {
	Controller,
	type ControllerProps,
	type FieldPath,
	type FieldValues,
	FormProvider,
	type SubmitHandler,
	type UseFormProps,
	type UseFormReturn,
	useForm,
	useFormContext,
	useFormState,
} from 'react-hook-form'
import { Button } from './button'
import { Input } from './input'
import { Label } from './label'

// Props for the configuration of the Form component
interface CreateFormProps<TFieldValues extends FieldValues = FieldValues>
	extends UseFormProps<TFieldValues> {
	onSubmit: (data: TFieldValues, form: UseFormReturn<TFieldValues>) => void
}

// Props for the actual rendered Form component
interface FormProps<TFieldValues extends FieldValues = FieldValues>
	extends Omit<React.ComponentProps<'div'>, 'children'> {
	// The render prop will now receive the form instance
	children: (form: UseFormReturn<TFieldValues>) => React.ReactNode
}

interface CustomFormContextValue<TFieldValues extends FieldValues = FieldValues>
	extends UseFormReturn<TFieldValues> {
	onSubmit: SubmitHandler<TFieldValues>
}

const CustomFormContext = React.createContext<
	CustomFormContextValue<any> | undefined
>(undefined)

function useCustomFormContext<
	TFieldValues extends FieldValues = FieldValues,
>(): CustomFormContextValue<TFieldValues> {
	const context = React.useContext(CustomFormContext)
	if (!context) {
		throw new Error('useCustomFormContext must be used within a Form component')
	}
	return context
}

type FormComponent<TFieldValues extends FieldValues> = (
	props: FormProps<TFieldValues>,
) => React.ReactElement | null

type FormComponentStatics<TFieldValues extends FieldValues> = {
	Field: <TName extends FieldPath<TFieldValues>>(
		props: ControllerProps<TFieldValues, TName>,
	) => React.ReactElement | null
	Item: typeof FormItem
	Label: typeof FormLabel
	Control: typeof FormControl
	Description: typeof FormDescription
	Message: typeof FormMessage
	Submit: typeof FormSubmit
	Input: typeof Input
}

function useCreateForm<TFieldValues extends FieldValues = FieldValues>(
	factory: () => CreateFormProps<TFieldValues>,
	deps: React.DependencyList = [],
) {
	// Compute config from factory using deps to control when it changes
	const config = React.useMemo(factory, deps)

	// Call hooks at the top-level of this custom hook (RULES OF HOOKS)
	const form = useForm<TFieldValues>(config)

	// Build the Form component once and keep stable as long as `form` or
	// `config.onSubmit` identity doesn't change.
	const FormComponentImpl = React.useMemo(() => {
		const Component: FormComponent<TFieldValues> &
			FormComponentStatics<TFieldValues> = (({ children }) => {
			return (
				<CustomFormContext.Provider
					value={{
						...form,
						onSubmit: (data, _event) => config.onSubmit(data, form),
					}}
				>
					<FormProvider {...form}>{children(form)}</FormProvider>
				</CustomFormContext.Provider>
			)
		}) as FormComponent<TFieldValues> & FormComponentStatics<TFieldValues>

		Component.Field = FormField
		Component.Input = Input
		Component.Item = FormItem
		Component.Label = FormLabel
		Component.Control = FormControl
		Component.Description = FormDescription
		Component.Message = FormMessage
		Component.Submit = FormSubmit

		return Component
	}, [form, config.onSubmit])

	return [FormComponentImpl, form] as const
}

type FormFieldContextValue<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
	name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
	{} as FormFieldContextValue,
)

function FormField<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ render, ...props }: ControllerProps<TFieldValues, TName>) {
	return (
		<FormFieldContext.Provider value={{ name: props.name }}>
			<Controller {...props} render={render} />
		</FormFieldContext.Provider>
	)
}

// FormItem component
type FormItemContextValue = {
	id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
	{} as FormItemContextValue,
)

function FormItem({ className, ...props }: React.ComponentProps<'div'>) {
	const id = React.useId()

	return (
		<FormItemContext.Provider value={{ id }}>
			<div
				data-slot='form-item'
				className={cn('grid h-fit gap-2', className)}
				{...props}
			/>
		</FormItemContext.Provider>
	)
}

function FormLabel({
	className,
	...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
	const { error, formItemId } = useFormField()

	return (
		<Label
			data-slot='form-label'
			data-error={!!error}
			className={cn('data-[error=true]:text-destructive', className)}
			htmlFor={formItemId}
			{...props}
		/>
	)
}

function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
	const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

	return (
		<Slot
			data-slot='form-control'
			id={formItemId}
			aria-describedby={
				!error
					? `${formDescriptionId}`
					: `${formDescriptionId} ${formMessageId}`
			}
			aria-invalid={!!error}
			{...props}
		/>
	)
}

function FormDescription({ className, ...props }: React.ComponentProps<'p'>) {
	const { formDescriptionId } = useFormField()

	return (
		<p
			data-slot='form-description'
			id={formDescriptionId}
			className={cn('text-muted-foreground text-sm', className)}
			{...props}
		/>
	)
}

function FormMessage({ className, ...props }: React.ComponentProps<'p'>) {
	const { error, formMessageId } = useFormField()
	const body = error ? String(error?.message ?? '') : props.children

	if (!body) {
		return null
	}

	return (
		<p
			data-slot='form-message'
			id={formMessageId}
			className={cn('text-destructive text-sm', className)}
			{...props}
		>
			{body}
		</p>
	)
}
// FormSubmit component - MODIFIED
// Make it generic and remove the required onClick prop if the form handles submit
interface FormSubmitProps<TFieldValues extends FieldValues = FieldValues>
	extends Omit<React.ComponentProps<typeof Button>, 'onClick'> {
	onClick?: (data: TFieldValues, form: UseFormReturn<TFieldValues>) => void
	loadingState?: React.ReactNode
}

function FormSubmit<TFieldValues extends FieldValues = FieldValues>({
	className,
	children,
	onClick,
	...props
}: FormSubmitProps<TFieldValues>) {
	const form = useCustomFormContext<TFieldValues>()
	const handleClick = onClick
		? () => form.handleSubmit((data) => onClick(data, form))()
		: () => form.handleSubmit((data) => form.onSubmit(data))()

	return (
		<Button
			className={cn(
				'rounded bg-primary px-4 py-2 text-primary-foreground',
				className,
			)}
			onClick={handleClick}
			{...props}
			disabled={
				form.formState.isSubmitting || props.disabled || form.formState.isValid
			}
		>
			{form.formState.isSubmitting
				? props.loadingState || (
						<>
							<Loader2 className='mr-2 h-4 w-4 animate-spin' />
							Guardando...
						</>
					)
				: children}
		</Button>
	)
}

// useFormField hook remains the same
const useFormField = () => {
	const fieldContext = React.useContext(FormFieldContext)
	const itemContext = React.useContext(FormItemContext)
	const { getFieldState } = useFormContext()
	const formState = useFormState({ name: fieldContext.name })
	const fieldState = getFieldState(fieldContext.name, formState)

	if (!fieldContext) {
		throw new Error('useFormField should be used within <FormField>')
	}

	const { id } = itemContext

	return {
		id,
		name: fieldContext.name,
		formItemId: `${id}-form-item`,
		formDescriptionId: `${id}-form-item-description`,
		formMessageId: `${id}-form-item-message`,
		...fieldState,
	}
}

export { useCreateForm }
