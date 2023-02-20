<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { Appbar } from '../../../../components';
	import { CITIES_WITH_NAMES, LS_RECENT_SEARCHES } from '../../../../utils/constants';
	import { debounce } from '../../../../utils/functions';
	import GlobalStore from '../../../../utils/stores/globalStore.store';
	import type { IRecentSearch } from '../../../../utils/stores/globalStore.store';
	import SearchItem from './SearchItem.svelte';
	import { SearchIcon } from '../../../../assets/icons';
	import type { IPopularCity } from '../../../../utils/interfaces';

	const { subscribe, update } = GlobalStore;
	// get parameters from route
	const { type: searchType } = $page.params;

	let src: any = {};
	let des: any = {};

	let pageTitle = 'Search City';
	let searchText: string = '';
	let recentSearches: IRecentSearch[] = [];
	let popularCities: IPopularCity[] = [];
	let allCities = CITIES_WITH_NAMES;
	let alertText: string = '';
	const DEBOUNCE_TIMEOUT = 500;

	subscribe((value) => {
		src = value.searchRequest.src;
		des = value.searchRequest.des;
		recentSearches = value.recentSearches;
		popularCities = value.popularCities;
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
			allCities = filteredCities;
		} else {
			allCities = CITIES_WITH_NAMES;
		}
	}, DEBOUNCE_TIMEOUT);

	function handleClickSearchItem(item: IPopularCity) {
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

	function getRecentSearchItem(item: IRecentSearch) {
		if (searchType === 'source') {
			return {
				id: item.id,
				city: item.src.city,
				iataCode: item.src.iataCode,
				name: item.src.name,
				createdAt: item.createdAt
			};
		} else {
			return {
				id: item.id,
				city: item.des.city,
				iataCode: item.des.iataCode,
				name: item.des.name,
				createdAt: item.createdAt
			};
		}
	}
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
			<SearchIcon />
		</div>
	</div>
	<div>
		{#if recentSearches?.length > 0 && searchText.length === 0}
			<h3>Recent Searches</h3>
			<div class="divider" />
			<ul>
				{#each recentSearches as rsItem}
					<li
						on:click={() => handleClickSearchItem(getRecentSearchItem(rsItem))}
						on:keydown={(e) =>
							e.key === 'Enter' && handleClickSearchItem(getRecentSearchItem(rsItem))}
					>
						<SearchItem
							item={searchType === 'source'
								? {
										id: rsItem.id,
										city: rsItem.src.city,
										iataCode: rsItem.src.iataCode,
										name: rsItem.src.name,
										createdAt: rsItem.createdAt
								  }
								: {
										id: rsItem.id,
										city: rsItem.des.city,
										iataCode: rsItem.des.iataCode,
										name: rsItem.des.name,
										createdAt: rsItem.createdAt
								  }}
							type="recent"
						/>
					</li>
					<div class="divider" />
				{/each}
			</ul>
		{/if}
	</div>
	{#if popularCities?.length > 0 && searchText.length === 0}
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
	{/if}
	{#if allCities?.length > 0}
		<div class="mt-6">
			<h3>All Cities</h3>
			<div class="divider" />
			<ul>
				{#each allCities as city}
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
	{/if}
	{#if allCities?.length === 0 && searchText.length > 0}
		<div class="flex justify-center items-center h-full">
			<div class="text-center">
				<h3 class="text-lg">No Results Found</h3>
				<p class="text-sm">Try searching with different keywords</p>
			</div>
		</div>
	{/if}
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

<style>
	section {
		min-height: calc(100vh - 80px);
	}
</style>
