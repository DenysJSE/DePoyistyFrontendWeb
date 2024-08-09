import cn from 'clsx'

interface IButton {
	type: 'button' | 'submit' | 'reset'
	title: string
	size?: 'small' | 'default' | 'large'
	onClick?: () => void
}

function Button({ type, title, size = 'default', onClick }: IButton) {
	return (
		<button
			type={type}
			className={cn('button', {
				'button-small': size === 'small',
				'button-large': size === 'large'
			})}
			onClick={onClick}
		>
			{title}
		</button>
	)
}

export default Button
