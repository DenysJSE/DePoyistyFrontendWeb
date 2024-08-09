const colors = {
	'app-text': 'var(--app-text)',
	background: 'var(--background)',
	white: '#ffffff',
	black: '#000000',
	error: 'var(--error)',
	subcolor: 'var(--subcolor)',
	'subcolor-hover': 'var(--subcolor-hover)',
	'button-dark-hover': 'var(--button-hover)',
	'active-element-hover': 'var(--active-element-hover)',
	'form-bg': 'var(--form)',
	border: 'var(--border)',
	placeholder: 'var(--placeholder)',
	'google-button-hover': 'var(--google-button-hover)'
}

// const fontSize = {
// 	xs: '0.82rem',
// 	sm: '0.98rem',
// 	base: '1.15rem',
// 	lg: '1.22rem',
// 	xl: '1.36rem',
// 	'1.5xl': '1.5rem',
// 	'2xl': '1.725rem',
// 	'3xl': '2.155rem',
// 	'4xl': '2.58rem',
// 	'5xl': '3.45rem',
// 	'6xl': '4.3rem',
// 	'7xl': '5.17rem',
// 	'8xl': '6.9rem',
// 	'9xl': '9.2rem'
// }
//
// const screens = {
// 	sm: '640px',
// 	md: '768px',
// 	lg: '1024px',
// 	xl: '1280px',
// 	'2xl': '1536px',
// 	'3xl': '1850px',
// 	'4xl': '2120px'
// }

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		colors,
		// fontSize,
		// screens,
		extend: {
			keyframes: {
				blink: {
					'0%': { opacity: '1' },
					'50%': { opacity: '0' },
					'100%': { opacity: '1' }
				}
			},
			animation: {
				blink: 'blink 1s infinite'
			}
		}
	},
	plugins: []
}
