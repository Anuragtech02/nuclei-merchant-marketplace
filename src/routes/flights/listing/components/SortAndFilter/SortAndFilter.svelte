<script lang="ts">
	import { BottomSheet } from '../../../../../components';
	import {
		DEPARTURE_TIME_OPTIONS,
		MORE_FILTERS_OPTIONS,
		SORT_OPTIONS,
		STOP_OPTIONS
	} from './constants';

	export let sourceName: string;
	export let preferredAirlinesOptions: Array<{
		name: string;
		code: string;
		icon: string;
	}>;

	let sortBy: string = 'price_asc';
	let stopsCount: string = 'non_stop';
	let departureTime: string = 'morning';
	let moreFilters: string[] = [];
	let preferredAirlines: string[] = [];

	function handleClickSortBy(value: string) {
		sortBy = value;
	}

	function handleClickPreferredAirlines(value: string) {
		if (preferredAirlines.includes(value)) {
			preferredAirlines = preferredAirlines.filter((item) => item !== value);
		} else {
			preferredAirlines = [...preferredAirlines, value];
		}
	}

	function handleClickMoreFilters(value: string) {
		if (moreFilters.includes(value)) {
			moreFilters = moreFilters.filter((item) => item !== value);
		} else {
			moreFilters = [...moreFilters, value];
		}
	}

	function handleClickStopsCount(value: string) {
		stopsCount = value;
	}

	function handleClickDepartureTime(value: string) {
		departureTime = value;
	}

	function handleApplyFilters() {
		console.log('apply filters');
	}
</script>

<BottomSheet id="sort-filters" type="bottom" classes="p-0 rounded-none min-h-screen">
	<div slot="customHeaderComp" class="w-full">
		<header class="bg-primary text-white w-full">
			<div class="max-w-sm mx-auto flex justify-between p-4 items-center text-white">
				<h5 class="text-white">Sort & Filter</h5>
				<div>
					<button class="btn btn-link capitalize text-accent decoration-none">Reset</button>
					<label for="sort-filters" class="btn btn-sm btn-square bg-white">
						<img src="/icons/close.svg" alt="close" />
					</label>
				</div>
			</div>
		</header>
	</div>
	<main class="p-4 max-w-sm mx-auto">
		<div>
			<h4>Sort By</h4>
			<div class="grid grid-rows-2 grid-flow-col gap-2 mt-2">
				{#each SORT_OPTIONS as option}
					<div
						class={`flex justify-between items-center bg-white rounded-lg p-4 px-5 outline-primary`}
						class:outline={sortBy === option.value}
						on:click={() => {
							handleClickSortBy(option.value);
						}}
						on:keydown={(e) => {
							if (e.key === 'Enter') {
								handleClickSortBy(option.value);
							}
						}}
					>
						<div>
							<h5>{option.label}</h5>
							<span class="text-xs text-stone-500">{option.subTitle}</span>
						</div>
						<!-- <input type="radio" name="sort" id={option.value} /> -->
					</div>
				{/each}
			</div>
		</div>
		<div class="divider" />
		<div>
			<h4>No. of Stops</h4>
			<div class="flex justify-between gap-4 mt-2">
				{#each STOP_OPTIONS as option}
					<div
						class="flex-1 bg-white rounded-lg p-4 px-5 border-primary outline-primary"
						class:outline={stopsCount === option.value}
						role="button"
						tabindex="0"
						on:click={() => {
							handleClickStopsCount(option.value);
						}}
						on:keydown={(e) => {
							if (e.key === 'Enter') {
								handleClickStopsCount(option.value);
							}
						}}
					>
						<div class="text-center">
							<h4>{option.count < 2 ? option.count : '2+'}</h4>
							<p class="text-stone-500 mt-2">{option.label}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
		<div class="divider" />
		<div>
			<h4>Departure from {sourceName}</h4>
			<div class="flex justify-between gap-4 mt-2">
				{#each DEPARTURE_TIME_OPTIONS as option}
					<div
						class="flex-1 bg-white rounded-lg p-4 px-5 border-primary outline-primary"
						class:outline={departureTime === option.value}
						role="button"
						tabindex="0"
						on:click={() => {
							handleClickDepartureTime(option.value);
						}}
						on:keydown={(e) => {
							if (e.key === 'Enter') {
								handleClickDepartureTime(option.value);
							}
						}}
					>
						<div class="text-center flex flex-col items-center">
							<img src={option.icon} alt={option.label} class="w-6 h-6" />
							<span class="text-stone-500 mt-2 text-xs">{option.time}</span>
							<p class="text-stone-500 mt-2 text-sm">{option.label}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
		<div class="divider" />
		<div>
			<h4>More Filters</h4>
			<div class="flex justify-between gap-4 mt-2 flex-wrap">
				{#each MORE_FILTERS_OPTIONS as option}
					<div
						class="flex-1 min-w-[150px] bg-white rounded-lg p-4 px-5 border-primary outline-primary"
						class:outline={moreFilters.includes(option.value)}
						role="button"
						tabindex="0"
						on:click={() => {
							handleClickMoreFilters(option.value);
						}}
						on:keydown={(e) => {
							if (e.key === 'Enter') {
								handleClickMoreFilters(option.value);
							}
						}}
					>
						<div class="flex flex-col justify-center items-center">
							<img src={option.icon} alt={option.label} class="w-4 h-4" />
							<p class="text-stone-500 mt-2 text-sm">{option.label}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
		<div class="divider" />
		<div class="bg-white rounded-xl p-4">
			<div class="flex justify-between items-center">
				<h4>Preferred Airlines</h4>
				<button
					class="btn btn-link capitalize text-primary p-0 m-0"
					on:click={() => {
						preferredAirlines = [];
					}}
				>
					Reset
				</button>
			</div>
			<div>
				{#each preferredAirlinesOptions as option}
					<div class="form-control">
						<label class="label cursor-pointer">
							<div class="flex items-center justify-start">
								<img src={option.icon} alt="flight-icon" />
								<span class="label-text ml-2">{option.name}</span>
							</div>
							<input
								type="checkbox"
								on:change={() => {
									handleClickPreferredAirlines(option.code);
								}}
								checked={preferredAirlines.includes(option.code)}
								class="checkbox"
							/>
						</label>
					</div>
				{/each}
			</div>
		</div>
		<button
			type="button"
			class="btn bg-accent hover:bg-accent text-white mt-6 capitalize w-full border-0">Apply</button
		>
	</main>
</BottomSheet>
