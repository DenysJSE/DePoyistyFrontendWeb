import { TAuthForm } from '../../types/auth.types.ts'
import { FieldErrors, RegisterOptions, UseFormRegister } from 'react-hook-form'
import { convertName } from '../../utils/convert-name.ts'
import cn from 'clsx'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

interface IInput {
	formRegister: UseFormRegister<TAuthForm>
	errors: FieldErrors<TAuthForm>
	title: 'email' | 'password' | 'name'
	validationRules?: RegisterOptions<TAuthForm, 'email' | 'password' | 'name'>
	type?: 'email' | 'text' | 'password'
}

interface IPasswordIcons {
	inputType?: 'email' | 'text' | 'password'
	setInputType: (inputType: 'email' | 'text' | 'password') => void
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
	const [inputType, setInputType] = useState(type)

	return (
		<div className='flex flex-col gap-1 relative'>
			<label
				htmlFor={`form-${title.toLowerCase()}`}
				className='text-sm text-placeholder'
			>
				{inputTitle}
			</label>
			<input
				id={`form-${title.toLowerCase()}`}
				type={inputType}
				{...formRegister(title, {
					...validationRules
				})}
				placeholder={inputTitle}
				className={cn(
					'text-app-text outline-none px-3 py-2 rounded-xl border border-border bg-form-bg placeholder:text-placeholder text-lg',
					{
						'border-dark-mode-border focus:border-subcolor': !errorMessage,
						'border-error focus:border-error': !!errorMessage,
						'pr-12': type === 'password'
					}
				)}
			/>
			{type === 'password' && (
				<PasswordIcons inputType={inputType} setInputType={setInputType} />
			)}
			{errorMessage && (
				<p className='text-error font-semibold text-sm'>{errorMessage}</p>
			)}
		</div>
	)
}

export default AuthInput

const PasswordIcons = ({
	inputType = 'password',
	setInputType
}: IPasswordIcons) => {
	return (
		<div className='absolute right-4 top-[38px]'>
			{inputType === 'password' ? (
				<Eye size={20} onClick={() => setInputType('text')} />
			) : (
				<EyeOff size={20} onClick={() => setInputType('password')} />
			)}
		</div>
	)
}
