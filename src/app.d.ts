// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
		interface ImportMetaEnv {
			VITE_API_URI_LANDING_SERVICE: string;
			VITE_API_URI_COMMON_SERVICE: string;
			VITE_API_URI_FLIGHT_TICKET_SERVICE: string;
			VITE_API_URI_LISTING_SERVICE: string;
			VITE_API_AUTH_TOKEN: string;
		}
	}
}

export {};
