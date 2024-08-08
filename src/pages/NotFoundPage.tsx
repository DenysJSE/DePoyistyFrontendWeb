import { Link } from 'react-router-dom'

function NotFoundPage() {
	return (
		<div className='w-screen h-screen grid place-content-center'>
			<h1 className='text-6xl'>404 | Not Found :(</h1>
			<Link
				to='/'
				className='bg-white rounded-xl py-3 w-1/2 text-black font-bold text-xl mt-6 hover:bg-button-hover text-center m-auto'
			>
				Go Home
			</Link>
		</div>
	)
}

export default NotFoundPage
