<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { Appbar, BottomSheet, FlightDetails } from '../../../components';
	import { getListingData } from '../../../utils/api/services';
	import { HEADER_HEIGHT } from '../../../utils/constants';
	import { formatDate, getCityByCode } from '../../../utils/functions';
	import type { IListingData, IOnwardFlight } from '../../../utils/interfaces';
	import CustomTitleComp from './components/CustomTitleComp.svelte';
	import SortAndFilter from './components/SortAndFilter/SortAndFilter.svelte';

	const FOOTER_HEIGHT = '64px';

	interface IParams {
		adultCount: string;
		childCount: string;
		departDate: string;
		des: string;
		infantCount: string;
		isNonStop: string;
		returnDate: string;
		src: string;
		travellerClass: string;
	}

	let travellerCount = 0;
	let isLoading = true;

	// extract all params from query in URL
	let searchParams = $page.url.searchParams;

	const params: IParams = {} as IParams;

	searchParams?.forEach((value: any, key: any) => {
		// @ts-ignore
		params[key] = value;
	});

	$: console.log({ params });

	let listingData: IListingData = {} as any;
	let flights: IOnwardFlight[] = [] as any;

	async function fetchListingData() {
		isLoading = true;
		try {
			const res = await getListingData({
				src: {
					iataCode: params?.src,
					city: String(getCityByCode(params?.src)),
					countryCode: 'IN'
				},
				des: {
					iataCode: params?.des,
					city: String(getCityByCode(params?.des)),
					countryCode: 'IN'
				},
				departDate: formatDate(params?.departDate),
				passenger: {
					adultCount: parseInt(params?.adultCount),
					childCount: parseInt(params?.childCount),
					infantCount: parseInt(params?.infantCount)
				},
				travellerClass: {
					key: params?.travellerClass,
					value: params?.travellerClass
				},
				appliedSortFilter: [
					{
						tabId: 'ONWARD',
						sortId: '1',
						filtersList: []
					}
				],
				partnerCountry: 'IN'
			});
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

	function searchFlightsUsingQuery(): IOnwardFlight[] {
		let tempFlights: IOnwardFlight[] = [];
		if (params?.src && params?.des) {
			tempFlights = flights.filter((flight) => {
				return (
					flight.onwardSegmentDetails?.sourceAirportCode?.iataCode === params?.src &&
					flight.onwardSegmentDetails.destinationAirportCode?.iataCode === params?.des
				);
			});
		}
		return tempFlights;
	}

	function getContainerHeight() {
		return `calc(100vh - ${HEADER_HEIGHT.DEFAULT} - ${FOOTER_HEIGHT})`;
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
		<label for="modify-search" class="btn bg-accent hover:bg-accent btn-sm btn-square">
			<img src="/icons/edit.svg" alt="edit" />
		</label>
	</div>
</Appbar>

<BottomSheet
	id="modify-search"
	modalClasses="flex flex-col justify-start"
	classes="rounded-none rounded-b-xl"
	type="top"
	title="Modify Search"
>
	<FlightDetails />
</BottomSheet>

<section class={`overflow-y-scroll`} style={`height: ${getContainerHeight()}`}>
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
			{#each searchFlightsUsingQuery() as flight}
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
						{#each flight?.specialFeatures as feature}
							<div class="flex justify-start gap-2">
								<img class="w-4" src={feature?.icon} alt={feature?.title} />
								<span class="text-xs text-stone-500">{feature?.title || 'NA'}</span>
							</div>
						{/each}
					</div>
				</li>
				<div class="divider" />
			{/each}
		</ul>
	{/if}
</section>

<SortAndFilter
	sourceName={String(getCityByCode(params.src))}
	preferredAirlinesOptions={[{ name: 'Air India', code: 'AI', icon: '/icons/meals.svg' }]}
/>

<footer class={`fixed bottom-0 left-0 w-full bg-[#E8E8EF] h-[64px]`}>
	<div class="max-w-[sm] mx-auto">
		<label
			for="sort-filters"
			class="btn btn-ghost hover:bg-accent rounded-none absolute right-0 h-full bg-accent flex flex-col drop-shadow-xl"
		>
			<img src="/icons/tweaks.svg" alt="filters" />
			<span class="text-white capitalize font-normal text-xs mt-2">Sort & Filters</span>
		</label>
	</div>
</footer>

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
