/** @type {import('tailwindcss').Config} */
const colors = {
	'error-red': '#ef4444',
	lime: '#a3e635',
	'light-lime': '#d9f99d',
	'button-hover': '#e7e5e4',
	// dark theme colors:
	'bg-dark-mode': '#1c1917',
	white: '#ffffff',
	black: '#000000',
	'dark-gray': '#292524',
	gray: '#44403c',
	'light-gray': '#d6d3d1',
	'dark-mode-border': '#57534e'
	// light theme colors:
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
