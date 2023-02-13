<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { getHomeData, getUpcomingBookings, getWalletData } from '../utils/api/services';
	import { GlobalStore, WalletStore } from '../utils/stores';
	import { NoInternet, ErrorModal } from '../components';
	const { update } = GlobalStore;
	const { update: updateWallet } = WalletStore;

	async function fetchWallet() {
		try {
			const res = await getWalletData();
			updateWallet((value) => {
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
			console.log(res.data);
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

<main class={`mt-[80px] pt-2 max-w-screen-sm mx-auto`}>
	<ErrorModal modalId="error-modal" />
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
