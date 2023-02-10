<script lang="ts">
	import {
		CloseIcon,
		HandBaggageIcon,
		MealsGreyIcon,
		RefundableGreyIcon,
		MorningIcon,
		NoonIcon,
		EveningIcon,
		NightIcon
	} from '../../../../../assets/icons';
	import { BottomSheet } from '../../../../../components';
	import { getCityByCode } from '../../../../../utils/functions';
	import type {
		IFilterList,
		ISortFilterOptions,
		ISortList,
		ISubFilterList
	} from '../../../../../utils/interfaces';
	import {
		DEPARTURE_TIME_OPTIONS,
		MORE_FILTERS_OPTIONS,
		SORT_OPTIONS,
		STOP_OPTIONS
	} from './constants';

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

	export let searchParams: IParams;
	let preferredAirlinesOptions: Array<{
		name: string;
		code: string;
		// icon is a svelte component
		icon: any;
	}> = [{ name: 'Air India', code: 'AI', icon: '/icons/meals.svg' }];
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

	let sourceName: string;
	let sortBy = {
		sortId: 1,
		name: 'Price\n(Cheapest First)',
		subName: '',
		iconUrl: '',
		selected: true
	};
	let gridFilters: any = {
		stopsCount: {} as ISubFilterList,
		departureTime: 'morning',
		moreFilters: []
	};
	let listFilters: any = {
		preferredAirlines: []
	};

	function handleClickSortBy(value: any) {
		sortBy = value;
	}

	function handleClickPreferredAirlines(value: string) {
		if (listFilters.preferredAirlines.includes(value)) {
			listFilters.preferredAirlines = listFilters.preferredAirlines.filter(
				(item: any) => item !== value
			);
		} else {
			listFilters.preferredAirlines = [...listFilters.preferredAirlines, value];
		}
	}

	function handleClickMoreFilters(value: string) {
		if (gridFilters.moreFilters.includes(value)) {
			gridFilters.moreFilters = gridFilters.moreFilters.filter((item: any) => item !== value);
		} else {
			gridFilters.moreFilters = [...gridFilters.moreFilters, value];
		}
	}

	const ICONS: any = {
		RefundableGreyIcon,
		HandBaggageIcon,
		MealsGreyIcon,
		MorningIcon,
		NoonIcon,
		EveningIcon,
		NightIcon
	};

	function handleApplyFilters() {}

	function handleResetFilters() {
		sortBy = {
			sortId: 1,
			name: 'Price\n(Cheapest First)',
			subName: '',
			iconUrl: '',
			selected: true
		};
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
</script>

<BottomSheet id="sort-filters" type="bottom" classes="p-0 rounded-none min-h-screen">
	<div slot="customHeaderComp" class="w-full">
		<header class="bg-primary text-white w-full">
			<div class="max-w-sm mx-auto flex justify-between p-4 items-center text-white">
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
	<main class="p-4 max-w-sm mx-auto">
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
							} gap-2 mt-2`}
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
								listFilters.preferredAirlines = [];
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
												handleClickPreferredAirlines(listItem.id);
											}}
											checked={listFilters.preferredAirlines.includes(listItem.id)}
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

		<button
			type="button"
			class="btn bg-accent hover:bg-accent text-white mt-6 capitalize w-full border-0">Apply</button
		>
	</main>
</BottomSheet>
