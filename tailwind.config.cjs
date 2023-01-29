/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: '#032F49'
				},
				bg: {
					DEFAULT: '#F0F0F5'
				}
			}
		}
	},
	plugins: [require('daisyui')]
};
