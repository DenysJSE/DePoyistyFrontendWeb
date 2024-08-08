import { createBrowserRouter } from 'react-router-dom'
import App from '../App.tsx'
import AuthPage from '../pages/AuthPage.tsx'
import NotFoundPage from '../pages/NotFoundPage.tsx'
import FavoriteDishes from '../pages/FavoriteDishes.tsx'
import PrivateRoute from '../components/protecred-routes/ProtectedRoute.tsx'
import AdminPrivateRoute from '../components/protecred-routes/AdminProtectedRoute.tsx'
import AdminPage from '../pages/AdminPage.tsx'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <NotFoundPage />
	},
	{
		path: '/auth',
		element: <AuthPage />
	},
	{
		path: '/favorite',
		element: (
			<PrivateRoute>
				<FavoriteDishes />
			</PrivateRoute>
		)
	},
	{
		path: '/admin',
		element: (
			<AdminPrivateRoute>
				<AdminPage />
			</AdminPrivateRoute>
		)
	}
])
