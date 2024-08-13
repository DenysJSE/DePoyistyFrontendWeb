import Header from './Header.tsx'
import { ReactNode } from 'react'

function Layout({ children }: { children: ReactNode }) {
	return (
		<main>
			<Header />
			<div className='pt-20'>{children}</div>
		</main>
	)
}

export default Layout
