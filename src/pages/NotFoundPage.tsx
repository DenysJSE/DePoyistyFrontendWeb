import Button from '../components/buttons/Button.tsx'
import { useNavigate } from 'react-router-dom'

function NotFoundPage() {
	const navigate = useNavigate()
	return (
		<div className='w-screen h-screen grid place-content-center'>
			<h1 className='text-6xl mb-10 font-bold'>404 | Not Found :(</h1>
			<Button type='button' onClick={() => navigate('/')} size='large'>
				Go Home
			</Button>
		</div>
	)
}

export default NotFoundPage
