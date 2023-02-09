<script lang="ts">
	import { Appbar, Card, FlightDetails, SkeletonLoading } from '../../components';
	import GlobalStore, { type IRecentSearch } from '../../utils/stores/globalStore';
	import type { IBooking } from '../../utils/interfaces';
	import {
		ArrowDownIcon,
		ArrowRightBlackIcon,
		ArrowRightIcon,
		KebabMenuIcon,
		PercentageIcon,
		RecentIcon,
		WalletIcon
	} from '../../assets/icons';
	import { getDateDayAndMonth } from '../../utils/functions';
	const { subscribe } = GlobalStore;
	let balance: number = 0;
	let upcomingBookings: IBooking[] = [];
	let recentSearches: IRecentSearch[] = [];
	let isLoading = true;
	let formatedDateStr = '';

	subscribe((value) => {
		upcomingBookings = value.upcomingBookings;
		recentSearches = value.recentSearches;
		isLoading = value.isLoading;
	});

	function getFormatedDateStr(date: string) {
		let dateObj = getDateDayAndMonth(date);
		return `${dateObj.day}, ${dateObj.date}, ${dateObj.month}`;
	}
</script>

<Appbar title="Flights" backLink="/">
	<div slot="extras" class="flex justify-between items-center gap-2">
		<button class="btn py-[4px] px-[16px] bg-[#1BA4F7] text-white">
			<WalletIcon /> &nbsp; ₹ {balance}
		</button>
		<button class="btn bg-[#1BA4F7] text-white">
			<PercentageIcon />
		</button>
		<button class="btn bg-transparent border-none p-0 ml-2">
			<KebabMenuIcon />
		</button>
	</div>
</Appbar>

<section class="w-full max-w-screen-sm mx-auto mt-6 sm:px-2 pt-2">
	<FlightDetails />
	<div class="mt-6">
		<div class="flex justify-between items-center">
			<h4>Upcoming Bookings</h4>
			{#if upcomingBookings.length > 0}
				<a class="link link-hover text-sm text-primary" href="/flights">View All</a>
			{/if}
		</div>
		{#if isLoading}
			<div class="my-2">
				<SkeletonLoading showImage imageShape="square" length="short" bordered />
			</div>
		{:else if upcomingBookings.length === 0}
			<div class="flex justify-center items-center h-[100px]">
				<p class="text-center text-sm text-stone-500">No upcoming bookings</p>
			</div>
		{:else}
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
						<span class="ml-[50px] -rotate-90">
							<ArrowDownIcon />
						</span>
					</Card>
				{/each}
			</div>
		{/if}
	</div>
	<div class="mt-6">
		<div class="flex justify-between items-center">
			<h4>Recent Searches</h4>
			{#if upcomingBookings.length > 0}
				<a class="link link-hover text-sm text-primary" href="/flights">View All</a>
			{/if}
		</div>
		{#if isLoading}
			<div class="my-2">
				<SkeletonLoading showImage imageShape="square" length="short" bordered />
			</div>
		{:else if recentSearches.length === 0}
			<div class="flex justify-center items-center h-[100px]">
				<p class="text-center text-sm text-stone-500">No recent searches</p>
			</div>
		{:else}
			<div class="carousel w-full max-w-full space-x-4">
				{#each recentSearches as search}
					<Card classes="carousel-item flex items-center py-4">
						<RecentIcon />
						<div class="ml-4">
							<div class="flex justify-between items-center &[>h5]:text-black gap-2">
								<h5>{search?.src?.city}</h5>
								<ArrowRightBlackIcon />
								<h5>{search?.des?.city}</h5>
							</div>
							<span class="text-xs text-stone-500">{getFormatedDateStr(search.departDate)}</span>
						</div>
					</Card>
				{/each}
			</div>
		{/if}
	</div>
</section>
