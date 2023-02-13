<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { CloseIcon } from '../../../../../assets/icons';
	import { BottomSheet } from '../../../../../components';
	import { getCityByCode } from '../../../../../utils/functions';
	import type {
		IFilterList,
		ISortFilterOptions,
		ISortList,
		ISubFilterList
	} from '../../../../../utils/interfaces';
	import type { IParams } from '../../utils';

	export let fetchListingData: (params: IParams) => void;
	export let sortFilterOptions: ISortFilterOptions;

	let sortList: ISortList[] = [];
	let filterList: IFilterList[] = [];

	function updateFilterOptions() {
		if (!sortFilterOptions?.sortFilter?.length) return;
		sortList = sortFilterOptions?.sortFilter[0]?.sortList;
		filterList = sortFilterOptions?.sortFilter[0]?.filterList;
		console.log({ sortList, filterList, sortFilterOptions });
	}

	$: sortFilterOptions, updateFilterOptions();

	let sortBy = {
		sortId: 1,
		name: 'Price\n(Cheapest First)',
		subName: '',
		iconUrl: '',
		selected: true
	};
	let gridFilters: any = {};
	let listFilters: any = {};

	function handleClickSortBy(value: any) {
		sortBy = value;
	}

	function handleClickListFilterItem(listFilterItem: any, item: any) {
		// check if the current item is already selected
		const prevItems = listFilters[listFilterItem.id] || [];
		if (prevItems?.findIndex((prevItem: any) => prevItem.id === item.id) > -1) {
			listFilters[listFilterItem.id] = prevItems.filter((prevItem: any) => prevItem.id !== item.id);
		} else {
			listFilters[listFilterItem.id] = [...prevItems, item];
		}
	}

	function handleApplyFilters() {
		// current URL
		const url = $page.url;
		const searchStr = url.search;
		const searchParams: any = new URLSearchParams(searchStr);
		// update the search params
		searchParams.set('sortId', sortBy.sortId.toString());
		// add gridFilters to searchParams
		Object.keys(gridFilters).forEach((key) => {
			const value = gridFilters[key];
			searchParams.set(
				`gridFilter.${key}`,
				Array.isArray(value) ? value.map((item: any) => item.id).join(',') : value.id
			);
		});
		// add listFilters to searchParams
		Object.keys(listFilters).forEach((key) => {
			const value = listFilters[key];
			searchParams.set(
				`listFilter.${key}`,
				Array.isArray(value) ? value.map((item: any) => item.id).join(',') : value.id
			);
		});
		console.log({ url, searchParams: searchParams.toString() });
		// navigate to the new URL
		goto(`${url.pathname}?${searchParams.toString()}`);
		fetchListingData(Object.fromEntries(searchParams) as IParams);
	}

	function handleResetFilters() {
		sortBy = {
			sortId: 1,
			name: 'Price\n(Cheapest First)',
			subName: '',
			iconUrl: '',
			selected: true
		};
		gridFilters = {};
		listFilters.preferredAirlines = [];
		listFilters = {};
	}

	function getFilterGrid() {
		return filterList?.filter((item: any) => item?.gridFilter?.subFilterList);
	}

	function getFilterList() {
		return filterList?.filter((item: any) => item?.listFilter?.listItems);
	}

	function handleClickFilterItem(gridItem: any, subGriditem: any) {
		// check if the current item is already selected
		const prevItems = gridFilters[gridItem.id] || [];
		if (prevItems?.findIndex((item: any) => item.id === subGriditem.id) > -1) {
			gridFilters[gridItem.id] = prevItems.filter((item: any) => item.id !== subGriditem.id);
		} else {
			gridFilters[gridItem.id] = [...prevItems, subGriditem];
		}
	}

	function getSelectedStatus(gridItem: any, subGridItem: any) {
		const prevItems = gridFilters[gridItem.id] || [];
		return prevItems?.findIndex((item: any) => item.id === subGridItem.id) > -1;
	}

	const HEADER_HEIGHT = '56px';
</script>

<BottomSheet id="sort-filters" type="bottom" classes="p-0 rounded-none min-h-screen relative">
	<div slot="customHeaderComp" class="w-full">
		<header class="bg-primary text-white w-full h-header">
			<div class="max-w-sm mx-auto h-full flex justify-between p-4 items-center text-white">
				<h5 class="text-white">Sort & Filter</h5>
				<div>
					<button
						class="btn btn-link capitalize text-accent decoration-none"
						on:click={handleResetFilters}>Reset</button
					>
					<label for="sort-filters" class="btn btn-sm btn-square bg-white">
						<CloseIcon />
					</label>
				</div>
			</div>
		</header>
	</div>
	<main class="px-4 max-w-sm mx-auto mainContainerHeight">
		<div>
			<h4>Sort By</h4>
			<div class="grid grid-rows-2 grid-flow-col gap-2 mt-2">
				{#each sortList as option}
					<div
						class={`flex justify-between items-center bg-white rounded-lg p-4 px-5 outline-primary`}
						class:outline={sortBy.name === option.name}
						on:click={() => {
							handleClickSortBy(option);
						}}
						on:keydown={(e) => {
							if (e.key === 'Enter') {
								handleClickSortBy(option);
							}
						}}
					>
						<div>
							<h5>{option.name?.split('\n')[0]}</h5>
							<span class="text-xs text-stone-500">{option.name?.split('\n')[1]}</span>
						</div>
						<!-- <input type="radio" name="sort" id={option.value} /> -->
					</div>
				{/each}
			</div>
		</div>
		<div class="divider" />
		{#if filterList?.length > 0}
			{#each getFilterGrid() as filterOption}
				<div>
					<h4>{filterOption?.title}</h4>
					{#if filterOption?.gridFilter}
						<div
							class={`grid grid-cols-${
								Object.values(filterOption?.gridFilter?.subFilterList)?.length
							} grid-flow-col gap-2 mt-2`}
						>
							{#each Object.values(filterOption?.gridFilter?.subFilterList) as subFilter}
								<div
									class="flex-1 bg-white rounded-lg p-2 py-3 border-primary outline-primary"
									class:outline={gridFilters[filterOption.id]?.findIndex(
										// @ts-ignore
										(item) => item.id === subFilter.id
									) > -1}
									role="button"
									tabindex="0"
									on:click={() => {
										handleClickFilterItem(filterOption, subFilter);
									}}
									on:keydown={(e) => {
										if (e.key === 'Enter') {
											handleClickFilterItem(filterOption, subFilter);
										}
									}}
								>
									<div class="text-center flex flex-col items-center justify-center">
										<!-- {#if subFilter?.text}
											<h4>{subFilter?.text}</h4>
										{/if} -->
										{#if subFilter?.imageUrl}
											<img class="w-5 grayscale" src={subFilter?.imageUrl} alt="filter" />
										{/if}
										{#if subFilter?.text}
											<p class="text-stone-500 mt-2 text-xs whitespace-nowrap">{subFilter.text}</p>
										{/if}
										{#if subFilter?.subText}
											<span class="text-xs text-stone-500">{subFilter?.subText}</span>
										{/if}
									</div>
								</div>
							{/each}
						</div>
					{/if}
				</div>
				<div class="divider" />
			{/each}
			{#each getFilterList() as filterOption}
				<div class="bg-white rounded-xl p-4">
					<div class="flex justify-between items-center">
						<h4>{filterOption?.title}</h4>
						<button
							class="btn btn-link capitalize text-primary p-0 m-0"
							on:click={() => {
								listFilters[filterOption.id] = [];
							}}
						>
							Reset
						</button>
					</div>
					{#if filterOption?.listFilter}
						<div>
							{#each Object.values(filterOption?.listFilter?.listItems) as listItem}
								<div class="form-control">
									<label class="label cursor-pointer">
										<div class="flex items-center justify-start">
											<img class="w-4 h-4" src={listItem?.iconUrl} alt="airline" />
											<span class="label-text text-black ml-2">{listItem.descText}</span>
										</div>
										<input
											type="checkbox"
											on:change={() => {
												handleClickListFilterItem(filterOption, listItem);
											}}
											checked={Boolean(listFilters[filterOption.id]?.includes(listItem.id))}
											class="checkbox"
										/>
									</label>
								</div>
							{/each}
						</div>
					{/if}
				</div>
			{/each}
		{/if}
		<div
			class="fixed bottom-0 left-0 w-full bg-bg p-4 h-footer drop-shadow-lg border border-stone-200 flex justify-center items-center"
		>
			<label
				for={'sort-filters'}
				class="btn bg-accent hover:bg-accent text-white capitalize w-full border-0 max-w-sm mx-auto"
				on:click={handleApplyFilters}
				role="button"
				tabindex="0"
				on:keydown={(e) => {
					if (e.key === 'Enter') {
						handleApplyFilters();
					}
				}}>Apply</label
			>
		</div>
	</main>
</BottomSheet>

<style>
	.mainContainerHeight {
		height: calc(100vh - calc(theme('height.footer') + theme('height.header')));
		padding-bottom: 2rem;
		overflow-y: auto;
		overflow-x: hidden;
	}
</style>
