import { TAuthForm } from '../../types/auth.types.ts'
import { FieldErrors, RegisterOptions, UseFormRegister } from 'react-hook-form'
import { convertName } from '../../utils/convert-name.ts'
import cn from 'clsx'

interface IInput {
	formRegister: UseFormRegister<TAuthForm>
	errors: FieldErrors<TAuthForm>
	title: 'email' | 'password' | 'name'
	validationRules?: RegisterOptions<TAuthForm, 'email' | 'password' | 'name'>
	type?: 'email' | 'text' | 'password'
}

function AuthInput({
	formRegister,
	errors,
	title,
	validationRules,
	type
}: IInput) {
	const inputTitle = convertName(title)
	const errorMessage = errors[title]?.message

	return (
		<div className='flex flex-col gap-1'>
			<label
				htmlFor={`form-${title.toLowerCase()}`}
				className='text-sm text-placeholder'
			>
				{inputTitle}
			</label>
			<input
				id={`form-${title.toLowerCase()}`}
				type={type}
				{...formRegister(title, {
					...validationRules
				})}
				placeholder={inputTitle}
				className={cn(
					'text-app-text outline-none px-3 py-2 rounded-xl border border-border bg-form-bg placeholder:text-placeholder text-lg',
					{
						'border-dark-mode-border focus:border-subcolor': !errorMessage,
						'border-error focus:border-error': !!errorMessage
					}
				)}
			/>
			{errorMessage && (
				<p className='text-error font-semibold text-sm'>{errorMessage}</p>
			)}
		</div>
	)
}

export default AuthInput
