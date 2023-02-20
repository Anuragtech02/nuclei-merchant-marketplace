<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import {
		getHomeData,
		getPopularCities,
		getUpcomingBookings,
		getWalletData
	} from '../utils/api/services';
	import { GlobalStore, WalletStore } from '../utils/stores';
	import { NoInternet, ErrorModal } from '../components';
	const { update, subscribe } = GlobalStore;
	const { update: updateWallet } = WalletStore;

	let showError: boolean = false;

	subscribe((value) => {
		showError = value.showError;
	});

	async function fetchWallet() {
		try {
			const res = await getWalletData();
			updateWallet((value) => {
				return { ...value, balance: res.data.walletDetails.walletTotalBalance };
			});
		} catch (error: any) {
			console.log('ERR_fetchWallet', error);
			update((value) => {
				return { ...value, isLoading: false, showError: true };
			});
		}
	}

	async function fetchUpcomingBookings() {
		try {
			const res = await getUpcomingBookings();
			update((value) => {
				return { ...value, upcomingBookings: res.data.booking };
			});
		} catch (error: any) {
			console.log('ERROR_fetchUpcomingBooking', error);
			update((value) => {
				return { ...value, isLoading: false, showError: true };
			});
		}
	}

	async function fetchHomeData() {
		try {
			const res = await getHomeData();
			console.log(res.data);
			update((value) => {
				return { ...value, searchRequest: res.data.searchRequest };
			});
		} catch (error: any) {
			console.log('ERROR_fetchHomeData', error);
			update((value) => {
				return { ...value, isLoading: false, showError: true };
			});
		}
	}

	async function fetchPopularCities() {
		try {
			const res = await getPopularCities();
			update((value) => {
				return {
					...value,
					popularCities: res.data.airportList?.map((item) => ({
						city: item.city,
						id: item.iataCode,
						createdAt: Date.now().toString(),
						name: item.name,
						iataCode: item.iataCode
					}))
				};
			});
		} catch (error: any) {
			console.log('ERROR_getPopluarCities', error);
			update((value) => {
				return { ...value, isLoading: false, showError: true };
			});
		}
	}

	onMount(() => {
		const allPromises = [
			fetchWallet(),
			fetchUpcomingBookings(),
			fetchHomeData(),
			fetchPopularCities()
		];
		Promise.all(allPromises)
			.then(() => {
				update((value) => {
					return { ...value, isLoading: false };
				});
			})
			.catch((error) => {
				console.log('ERROR_FETCH_ALL_APIS', error);
				update((value) => {
					return { ...value, isLoading: false, showError: true };
				});
			});
	});
</script>

<main class={`mt-[80px] pt-2 max-w-screen-sm mx-auto`}>
	<ErrorModal open={showError} modalId="error-modal" />
	<NoInternet />
	<slot />
</main>

<style>
	@media screen and (max-width: 786px) {
		main {
			padding: 0 1rem;
		}
	}
</style>
