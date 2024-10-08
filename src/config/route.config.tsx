import { createBrowserRouter } from 'react-router-dom'
import AuthPage from '../pages/AuthPage.tsx'
import NotFoundPage from '../pages/NotFoundPage.tsx'
import FavoriteDishes from '../pages/FavoriteDishes.tsx'
import PrivateRoute from '../components/protecred-routes/ProtectedRoute.tsx'
import AdminPrivateRoute from '../components/protecred-routes/AdminProtectedRoute.tsx'
import AdminPage from '../pages/AdminPage.tsx'
import AuthGoogleCallback from '../components/auth/AuthGoogleCallback.tsx'
import Home from '../pages/Home.tsx'
import Layout from '../layout/Layout.tsx'
import DishCard from '../components/dish-card/DishCard.tsx'
import AdminRestaurants from '../components/admin/restaurants/AdminRestaurants.tsx'
import AdminCategories from '../components/admin/categories/AdminCategories.tsx'
import AdminReviews from '../components/admin/reviews/AdminReviews.tsx'

export const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<Layout>
				<Home />
			</Layout>
		),
		children: [
			{
				path: '/dish/:dishId',
				element: <DishCard />
			}
		],
		errorElement: <NotFoundPage />
	},
	{
		path: '/m/dish/:dishId',
		element: (
			<Layout>
				<DishCard />
			</Layout>
		)
	},
	{
		path: '/auth',
		element: <AuthPage />
	},
	{
		path: '/auth/callback',
		element: <AuthGoogleCallback />
	},
	{
		path: '/favorite',
		element: (
			<PrivateRoute>
				<Layout>
					<FavoriteDishes />
				</Layout>
			</PrivateRoute>
		)
	},
	{
		path: '/admin',
		element: (
			<AdminPrivateRoute>
				<Layout>
					<AdminPage />
				</Layout>
			</AdminPrivateRoute>
		),
		children: [
			{
				path: '/admin/restaurants',
				element: <AdminRestaurants />
			},
			{
				path: '/admin/categories',
				element: <AdminCategories />
			},
			{
				path: '/admin/reviews',
				element: <AdminReviews />
			},
			{
				path: '/admin/users',
				element: ''
			}
		]
	}
])
