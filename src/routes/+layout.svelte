<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { getHomeData, getUpcomingBookings, getWalletData } from '../utils/api/services';
	import GlobalStore from '../utils/stores/globalStore';
	import { HEADER_HEIGHT } from '../utils/constants';
	const { update } = GlobalStore;

	async function fetchWallet() {
		try {
			const res = await getWalletData();
			update((value) => {
				return { ...value, balance: res.data.walletDetails.walletTotalBalance };
			});
		} catch (error: any) {
			console.log('ERR_fetchWallet', error);
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
		}
	}

	async function fetchHomeData() {
		try {
			const res = await getHomeData();
			update((value) => {
				return { ...value, searchRequest: res.data.searchRequest };
			});
		} catch (error: any) {
			console.log('ERROR_fetchHomeData', error);
		}
	}

	onMount(() => {
		const allPromises = [fetchWallet(), fetchUpcomingBookings(), fetchHomeData()];
		Promise.all(allPromises).then(() => {
			update((value) => {
				return { ...value, isLoading: false };
			});
		});
	});
</script>

<main class={`mt-[${HEADER_HEIGHT.DEFAULT}] pt-2 max-w-screen-sm mx-auto`}>
	<slot />
</main>

<style>
	@media screen and (max-width: 786px) {
		main {
			padding: 0 1rem;
		}
	}
</style>
