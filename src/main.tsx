import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './assets/Global.scss'
import { router } from './config/route.config.tsx'
import { AuthProvider } from './context/AuthProvider.tsx'
import Loader from './components/Loader.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Suspense fallback={<Loader />}>
			<AuthProvider>
				<RouterProvider router={router} />
			</AuthProvider>
		</Suspense>
	</React.StrictMode>
)
