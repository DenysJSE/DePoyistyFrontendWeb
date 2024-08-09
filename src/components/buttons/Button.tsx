import cn from 'clsx'

interface IButton {
	type: 'button' | 'submit' | 'reset'
	title: string
	size?: 'small' | 'default' | 'large'
}

function Button({ type, title, size = 'default' }: IButton) {
	return (
		<button
			type={type}
			className={cn('button', {
				'button-small': size === 'small',
				'button-large': size === 'large'
			})}
		>
			{title}
		</button>
	)
}

export default Button
