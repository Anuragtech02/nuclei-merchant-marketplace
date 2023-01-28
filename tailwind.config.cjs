/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			// colors: {
			// 	primary: {
			// 		DEFAULT: '#1E40AF',
			// 		50: '#F0F5FF',
			// 		100: '#E5EDFF',
			// 		200: '#C3D4FF',
			// 		300: '#A3BCFE',
			// 		400: '#7F9CF5',
		}
	},
	plugins: [require('daisyui')]
};
