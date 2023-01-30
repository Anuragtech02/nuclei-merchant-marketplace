<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { Appbar } from '../../../../components';
	import { CITIES_WITH_NAMES } from '../../../../utils/constants';
	import { debounce } from '../../../../utils/functions';
	import GlobalStore from '../../../../utils/stores/globalStore';
	import type { IRecentSearch } from '../../../../utils/stores/globalStore';
	import SearchItem from './SearchItem.svelte';

	const { subscribe, update } = GlobalStore;
	// get parameters from route
	const { type: searchType } = $page.params;

	let src: any = {};
	let des: any = {};

	let pageTitle = 'Search City';
	let searchText: string = '';
	let recentSearches: IRecentSearch[] = [];
	let popularCities: IRecentSearch[] = CITIES_WITH_NAMES;
	let alertText: string = '';
	const DEBOUNCE_TIMEOUT = 500;

	subscribe((value) => {
		src = value.searchRequest.src;
		des = value.searchRequest.des;
	});

	// debounced search function
	const searchCity = debounce((searchText: string) => {
		if (searchText.length > 0) {
			const filteredCities = CITIES_WITH_NAMES.filter((city) => {
				return (
					city.city.toLowerCase().includes(searchText.toLowerCase()) ||
					city.iataCode.toLowerCase().includes(searchText.toLowerCase()) ||
					city.name.toLowerCase().includes(searchText.toLowerCase())
				);
			});
			popularCities = filteredCities;
		} else {
			popularCities = CITIES_WITH_NAMES;
		}
	}, DEBOUNCE_TIMEOUT);

	function handleClickSearchItem(item: IRecentSearch) {
		let { city, iataCode, name } = item;
		let updateKey = searchType === 'source' ? 'src' : 'des';

		if (searchType === 'source') {
			// check if source and destination are same
			if (des.iataCode === iataCode) {
				alertText = 'Source and Destination cannot be same';
				return;
			}
		}
		if (searchType === 'des') {
			// check if source and destination are same
			if (src.iataCode === iataCode) {
				alertText = 'Source and Destination cannot be same';
				return;
			}
		}

		update((store) => {
			store.searchRequest = {
				...store.searchRequest,
				[updateKey]: {
					city,
					iataCode,
					name,
					iconUrl: '/icons/location.svg',
					countryCode: 'IN'
				}
			};
			return store;
		});
		goto('/flights');
	}

	$: searchType === 'source'
		? (pageTitle = 'Search Source City')
		: (pageTitle = 'Search Destination City');
	$: searchText, searchCity(searchText);
	$: alertText &&
		setTimeout(() => {
			alertText = '';
		}, 3000);
</script>

<Appbar title={pageTitle} backLink="/flights" />

<section>
	<div class="bg-bg py-6 sticky top-[80px]">
		<div class="flex justify-between items-center bg-white rounded-lg py-3 px-4 ">
			<input
				type="text"
				bind:value={searchText}
				placeholder="Enter City/Airport Name"
				class="w-full bg-transparent focus:outline-none text-black"
			/>
			<img src="/icons/search.svg" alt="search" />
		</div>
	</div>
	<div>
		{#if recentSearches.length > 0}
			<h3>Recent Searches</h3>
			<div class="divider" />
			<ul>
				{#each recentSearches as rsItem}
					<li
						on:click={() => handleClickSearchItem(rsItem)}
						on:keydown={(e) => e.key === 'Enter' && handleClickSearchItem(rsItem)}
					>
						<SearchItem item={rsItem} type="recent" />
					</li>
					<div class="divider" />
				{/each}
			</ul>
		{/if}
	</div>
	<!-- Popular Cities -->
	<div class="mt-6">
		<h3>Popular Cities</h3>
		<div class="divider" />
		<ul>
			{#each popularCities as city}
				<li
					on:click={() => handleClickSearchItem(city)}
					on:keydown={(e) => e.key === 'Enter' && handleClickSearchItem(city)}
				>
					<SearchItem item={city} type="new" />
				</li>
				<div class="divider" />
			{/each}
		</ul>
	</div>
	{#if alertText?.length > 0}
		<div class="toast toast-top toast-end">
			<div class="alert alert-error">
				<div>
					<span class="text-sm">{alertText}</span>
				</div>
			</div>
		</div>
	{/if}
</section>
