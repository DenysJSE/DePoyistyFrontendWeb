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
				className='text-sm text-light-gray'
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
					'text-white outline-none px-3 py-2 rounded-xl border border-dark-mode-border bg-dark-gray placeholder:text-light-gray text-lg',
					{
						'border-dark-mode-border focus:border-lime': !errorMessage,
						'border-error-red focus:border-error-red': !!errorMessage
					}
				)}
			/>
			{errorMessage && (
				<p className='text-error-red font-semibold text-sm'>{errorMessage}</p>
			)}
		</div>
	)
}

export default AuthInput
