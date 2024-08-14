import cn from 'clsx'
import { ReactNode } from 'react'

interface IButton {
	type: 'button' | 'submit' | 'reset'
	size?: 'small' | 'default' | 'large'
	onClick?: () => void
	className?: string
	disabled?: boolean
	children: ReactNode
}

function Button({
	type,
	size = 'default',
	onClick,
	className,
	disabled = false,
	children
}: IButton) {
	return (
		<button
			type={type}
			className={cn(
				'button',
				{
					'button-small': size === 'small',
					'button-large': size === 'large'
				},
				className
			)}
			disabled={disabled}
			onClick={onClick}
		>
			{children}
		</button>
	)
}

export default Button
