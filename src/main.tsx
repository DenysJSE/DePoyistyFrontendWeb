import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './assets/Global.scss'
import { router } from './config/route.config.tsx'
import { AuthProvider } from './context/AuthProvider.tsx'
import Loader from './components/Loader.tsx'
import { ThemeProvider } from './context/ThemeContext.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const setInitialTheme = () => {
	const isDark = localStorage.getItem('isDark') === 'true'
	document.body.dataset.theme = isDark ? 'dark' : 'light'
}
setInitialTheme()

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Suspense fallback={<Loader />}>
			<QueryClientProvider client={queryClient}>
				<AuthProvider>
					<ThemeProvider>
						<RouterProvider router={router} />
						<ReactQueryDevtools />
					</ThemeProvider>
				</AuthProvider>
			</QueryClientProvider>
		</Suspense>
	</React.StrictMode>
)
