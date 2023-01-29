<script lang="ts">
	import { Appbar, Card, FlightDetails } from '../../components';
	import { onMount } from 'svelte';
	import GlobalStore from '../../utils/stores/globalStore';
	import { getHomeData, getUpcomingBookings, getWalletData } from '../../utils/api/services';
	import type { IBooking } from '../../utils/interfaces';
	const { subscribe, update } = GlobalStore;
	let balance: number = 0;
	let upcomingBookings: IBooking[] = [];

	subscribe((value) => {
		upcomingBookings = value.upcomingBookings;
	});

	async function fetchWallet() {
		try {
			const res = await getWalletData();
			balance = res.data.walletDetails.walletTotalBalance;
			update((value) => {
				return { ...value, balance: res.data.walletDetails.walletTotalBalance };
			});
		} catch (error: any) {
			console.log('ERR_fetchWalletR_', error);
		}
	}

	async function fetchUpcomingBookings() {
		try {
			const res = await getUpcomingBookings();
			update((value) => {
				return { ...value, upcomingBookings: res.data.booking };
			});
		} catch (error: any) {
			console.log('ERROR_fetchUpcomingBookiror', error);
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
		fetchWallet();
		fetchUpcomingBookings();
		fetchHomeData();
	});
</script>

<Appbar title="Flights" backLink="/">
	<div slot="extras" class="flex justify-between items-center gap-2">
		<button class="btn py-[4px] px-[16px] bg-[#1BA4F7] text-white">
			<img src="/icons/wallet.svg" alt="wallet" /> &nbsp; ₹ {balance}
		</button>
		<button class="btn bg-[#1BA4F7] text-white">
			<img src="/icons/percentage.svg" alt="offers" />
		</button>
		<button class="btn bg-transparent border-none p-0 ml-2">
			<img src="/icons/kebab-menu.svg" alt="menu" />
		</button>
	</div>
</Appbar>
<section class="w-full max-w-screen-sm mx-auto mt-6 sm:px-2">
	<FlightDetails />
	<div class="mt-6">
		<h4>Upcoming Bookings</h4>
		<div class="carousel w-full max-w-full space-x-4">
			{#each upcomingBookings as booking}
				<Card classes="carousel-item flex items-center py-4">
					<div class="avatar">
						<div class="w-16 h-16 rounded">
							<img src={booking.imageUrl} alt={booking.title} />
						</div>
					</div>
					<div class="ml-4">
						<h5>{booking.title}</h5>
						<span class="text-xs text-stone-500">{booking.subtitle}</span>
						<p class="text-xs mt-2 text-black">{booking.thirdTitle}</p>
					</div>
					<img src="/icons/arrow-down.svg" alt="arrow" class="ml-[50px] -rotate-90" />
				</Card>
			{/each}
		</div>
	</div>
</section>
