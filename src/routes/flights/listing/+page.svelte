<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { Appbar } from '../../../components';
	import { getListingData } from '../../../utils/api/services';
	import { getCityByCode } from '../../../utils/functions';
	import type { IListingData, IOnwardFlight } from '../../../utils/interfaces';
	import CustomTitleComp from './CustomTitleComp.svelte';

	let travellerCount = 0;
	let isLoading = true;

	// extract all params from query in URL
	let searchParams = $page.url.searchParams;

	const params = {} as any;

	searchParams?.forEach((value, key) => {
		params[key] = value;
	});

	let listingData: IListingData = {} as any;
	let flights: IOnwardFlight[] = [] as any;

	async function fetchListingData() {
		isLoading = true;
		try {
			const res = await getListingData();
			listingData = res.data;
			flights = listingData.onwardFlights;
		} catch (error) {
			console.log('ERROR_FETCHING_LISTING_DATA', error);
		}
		isLoading = false;
	}

	onMount(async () => {
		fetchListingData();
	});

	$: params.adultCount,
		params.childCount,
		params.infantCount,
		(travellerCount =
			parseInt(params.adultCount) + parseInt(params.childCount) + parseInt(params.infantCount));

	// date to internationl time
	function get24HourTime(date: string) {
		const d = new Date(parseInt(date));
		const hours = d.getHours();
		const minutes = d.getMinutes();
		const ampm = hours >= 12 ? 'pm' : 'am';
		const hours12 = hours % 12;
		const hours12String = hours12 ? hours12.toString() : '12';
		const minutesString = minutes < 10 ? '0' + minutes.toString() : minutes.toString();
		return hours12String + ':' + minutesString + ' ' + ampm;
	}
</script>

<Appbar title="Listing Page" customTitleComp={true}>
	<div slot="customTitleComp">
		<CustomTitleComp
			src={`${getCityByCode(params?.src)}`}
			des={`${getCityByCode(params?.des)}`}
			departureDate={params?.departDate}
			returnDate={params?.returnDate}
			{travellerCount}
			travellerClass={params?.travellerClass}
		/>
	</div>
	<div slot="extras">
		<button class="btn bg-accent hover:bg-accent btn-sm btn-square">
			<img src="/icons/edit.svg" alt="edit" />
		</button>
	</div>
</Appbar>

<section class="mt-[80px]">
	{#if isLoading}
		<div class="w-full h-full">
			{#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as item}
				<div class="w-full h-16 rounded-lg shadow-md my-2 skeleton" />
			{/each}
		</div>
	{:else if flights.length === 0}
		<div class="w-full h-screen flex justify-center items-center">
			<p>No flights found</p>
		</div>
	{/if}
	{#if flights.length > 0}
		<ul class="pt-4">
			{#each flights as flight}
				<li class="my-4">
					<div class="flex justify-between">
						<div>
							<div class="avatar">
								<div class="w-14 rounded-lg">
									<img
										src={flight?.onwardSegmentDetails?.segmentAirlineInfos[0]?.airlineIconUrl}
										alt="flight-name"
									/>
								</div>
							</div>
							<p class="text-black text-xs">
								{flight?.onwardSegmentDetails?.segmentAirlineInfos[0]?.airlineName}
							</p>
						</div>
						<div>
							<h4 class="text-center font-semibold">
								{flight?.onwardSegmentDetails?.airlineTime}
							</h4>
							<p class="text-black text-sm">{flight?.onwardSegmentDetails?.airlineDuration}</p>
						</div>
						<div>
							<h5 class="text-green" style="color: #00AF07">
								{flight?.fareList[0]?.currencySymbol}{flight?.fareList[0]?.fareS}
							</h5>
						</div>
					</div>
					<div class="flex justify-start gap-2 mt-2">
						<div class="flex justify-start gap-2">
							<img src="/icons/refundable.png" alt="refundable" />
							<span class="text-xs text-stone-500">Refundable</span>
						</div>
						<div class="flex justify-start gap-2">
							<img src="/icons/meals.svg" alt="meal" />
							<span class="text-xs text-stone-500">Free Meal</span>
						</div>
					</div>
				</li>
				<div class="divider" />
			{/each}
		</ul>
	{/if}
</section>

<style>
	/* skeleteon loading animation */
	@keyframes skeleton {
		0% {
			background-position: -200px 0;
		}
		100% {
			background-position: calc(200px + 100%) 0;
		}
	}
	.skeleton {
		background-image: linear-gradient(90deg, #f2f2f2 0px, #e6e6e6 40px, #f2f2f2 80px);
		background-size: 200px 100%;
		background-repeat: no-repeat;
		animation: skeleton 1.2s ease-in-out infinite;
	}
</style>
