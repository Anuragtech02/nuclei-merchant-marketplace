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
				},
				accent: {
					DEFAULT: '#1BA4F7'
				}
			}
		}
	},
	plugins: [require('daisyui')]
};
