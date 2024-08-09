import Header from './Header.tsx'
import { ReactNode } from 'react'

function Layout({ children }: { children: ReactNode }) {
	return (
		<main>
			<Header />
			{children}
		</main>
	)
}

export default Layout
