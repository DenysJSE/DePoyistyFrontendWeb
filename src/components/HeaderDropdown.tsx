import ThemeSwitcher from './buttons/ThemeSwitcher.tsx'

interface IHeaderDropdown {
	handleLogout: () => void
}

function HeaderDropdown({ handleLogout }: IHeaderDropdown) {
	return (
		<div>
			<h1 className='font-semibold px-3 max-xs:text-lg'>My Account</h1>
			<hr className='border-none h-0.5 bg-border rounded-full opacity-60 my-2 mx-3' />
			<div className='flex flex-col items-start gap-0.5 mt-4 max-xs:mt-2'>
				<ThemeSwitcher />
				<h1
					className='text-lg text-placeholder p-1 px-4 hover:bg-active-element-hover w-full cursor-pointer rounded-lg max-xs:text-sm'
					onClick={handleLogout}
				>
					Logout
				</h1>
			</div>
		</div>
	)
}

export default HeaderDropdown
