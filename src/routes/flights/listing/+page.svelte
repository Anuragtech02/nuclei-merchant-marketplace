<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { EditIcon, TweaksIcon } from '../../../assets/icons';
	import { Appbar, BottomSheet, FlightDetails } from '../../../components';
	import { getListingData, getSortFilterOptions } from '../../../utils/api/services';
	import { HEADER_HEIGHT, LS_RECENT_SEARCHES } from '../../../utils/constants';
	import { formatDate, getCityByCode } from '../../../utils/functions';
	import type { IListingData, IOnwardFlight, ISortFilterOptions } from '../../../utils/interfaces';
	import CustomTitleComp from './components/CustomTitleComp.svelte';
	import SortAndFilter from './components/SortAndFilter/SortAndFilter.svelte';
	import GlobalStore, { type IRecentSearch } from '../../../utils/stores/globalStore.store';
	import { getSearchRequestObj, updateRecentSearches, type IParams } from './utils';
	import { goto } from '$app/navigation';

	const FOOTER_HEIGHT = '64px';
	let isOpenModifySearchSheet = false;

	let travellerCount = 0;
	let isLoading = true;
	let sortFilterOptions: ISortFilterOptions = {} as ISortFilterOptions;

	// extract all params from query in URL
	// let searchParams = $page.url.searchParams;

	export let data: PageData;

	let params: IParams = {} as IParams;

	$: params = data.params;

	// searchParams?.forEach((value: any, key: any) => {
	// 	// @ts-ignore
	// 	params[key] = value;
	// });

	let listingData: IListingData = {} as any;
	let flights: IOnwardFlight[] = [] as any;

	async function fetchListingData(listingParams: IParams) {
		isLoading = true;
		try {
			const res = await getListingData(getSearchRequestObj(listingParams));
			listingData = res.data;
			flights = listingData.onwardFlights;
		} catch (error) {
			console.log('ERROR_FETCHING_LISTING_DATA', error);
		}
		isLoading = false;
	}

	async function fetchSortFilterOptions() {
		try {
			const res = await getSortFilterOptions(getSearchRequestObj(params));
			sortFilterOptions = res.data;
		} catch (error) {
			console.log('ERROR_FETCHING_SORT_FILTER_OPTIONS', error);
		}
	}

	onMount(async () => {
		if (!params?.src || !params?.des || !params?.departDate) {
			goto('/flights');
			return;
		}
		fetchListingData(params);
		updateRecentSearches(params);
		fetchSortFilterOptions();
	});

	$: fetchListingData(params);

	$: params.adultCount,
		params.childCount,
		params.infantCount,
		(travellerCount =
			parseInt(params.adultCount) + parseInt(params.childCount) + parseInt(params.infantCount));

	function getContainerHeight() {
		return `calc(100vh - ${HEADER_HEIGHT.DEFAULT} - ${FOOTER_HEIGHT})`;
	}

	function handleCloseSheet() {
		console.log('Handle Close');
		isOpenModifySearchSheet = false;
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
			<EditIcon />
		</label>
	</div>
</Appbar>

<BottomSheet
	id="modify-search"
	modalClasses="flex flex-col justify-start"
	classes="rounded-none rounded-b-xl"
	type="top"
	title="Modify Search"
	open={isOpenModifySearchSheet}
>
	<FlightDetails afterClickSearch={handleCloseSheet} />
</BottomSheet>

<section class={`overflow-y-scroll`} style={`height: ${getContainerHeight()}`}>
	{#if isLoading}
		<div class="w-full h-full">
			{#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as item}
				<div class="w-full h-16 rounded-lg shadow-md my-2 skeleton" />
			{/each}
		</div>
	{:else if flights?.length === 0}
		<div class="w-full h-screen flex justify-center items-center">
			<p>No flights found</p>
		</div>
	{/if}
	{#if flights?.length > 0}
		<ul class="pt-4">
			{#each flights as flight, i}
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
				{#if i < flights?.length - 1}
					<div class="divider" />
				{/if}
			{/each}
		</ul>
	{/if}
</section>

<SortAndFilter {sortFilterOptions} {fetchListingData} />

<footer class={`fixed bottom-0 left-0 w-full bg-[#E8E8EF] h-[64px]`}>
	<div class="max-w-[sm] mx-auto">
		<label
			for="sort-filters"
			class="btn btn-ghost hover:bg-accent rounded-none absolute right-0 h-full bg-accent flex flex-col drop-shadow-xl"
		>
			<TweaksIcon />
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
