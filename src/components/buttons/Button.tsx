import cn from 'clsx'

interface IButton {
	type: 'button' | 'submit' | 'reset'
	title: string
	size?: 'small' | 'default' | 'large'
	onClick?: () => void
	className?: string
}

function Button({
	type,
	title,
	size = 'default',
	onClick,
	className
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
			onClick={onClick}
		>
			{title}
		</button>
	)
}

export default Button
