import cn from 'clsx'

interface IButton {
	type: 'button' | 'submit' | 'reset'
	title: string
	variant: 'light' | 'dark'
	size?: 'small' | 'default' | 'large'
}

function Button({ type, title, variant, size = 'default' }: IButton) {
	return (
		<button
			type={type}
			className={cn('button', {
				'button-light': variant === 'light',
				'button-dark': variant === 'dark',
				'button-small': size === 'small',
				'button-large': size === 'large'
			})}
		>
			{title}
		</button>
	)
}

export default Button
