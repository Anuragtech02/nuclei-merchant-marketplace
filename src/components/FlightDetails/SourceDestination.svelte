<script lang="ts">
	const FLIGHT_DETAILSL_HEIGHT = 80;
	import GlobalStore from '../../utils/stores/globalStore.store';
	import { getCityByCode } from '../../utils/functions';
	import Card from '../Card.svelte';
	import type { ILocationObj, ISearchRequest } from '../../utils/interfaces';
	import { goto } from '$app/navigation';
	import { SkeletonLoading } from '..';
	import { DotIcon, PlaneIcon, SwapIcon } from '../../assets/icons';
	const { subscribe, update } = GlobalStore;
	let searchRequest: ISearchRequest = {} as any;
	let source: ILocationObj = {} as any;
	let destination: ILocationObj = {} as any;
	let isLoading: boolean = true;

	function handleSwapSourceAndDestination() {
		update((value) => {
			const temp = value.searchRequest.src;
			value.searchRequest.src = value.searchRequest.des;
			value.searchRequest.des = temp;
			return value;
		});
	}

	subscribe((value) => {
		searchRequest = value.searchRequest;
		isLoading = value.isLoading;
	});

	$: searchRequest, (source = searchRequest?.src);
	$: searchRequest, (destination = searchRequest?.des);
</script>

<Card classes="flex justify-between items-center gap-2">
	{#if isLoading}
		<SkeletonLoading length="short" />
	{:else}
		<div class={`flex flex-col items-center justify-between h-[${FLIGHT_DETAILSL_HEIGHT}px] gap-1`}>
			<div>
				<DotIcon />
			</div>
			<div class="w-[1px] bg-black flex-1" />
			<div>
				<PlaneIcon />
			</div>
		</div>
		<div class={`flex-1 h-[${FLIGHT_DETAILSL_HEIGHT}px] flex flex-col justify-between`}>
			<div
				class="flex justify-start"
				on:click={() => goto('/flights/search-query/source')}
				on:keydown={(e) => {
					if (e.key === 'Enter') {
						goto('/flights/search-query/source');
					}
				}}
			>
				<span class="border-solid border-2 px-2 py-1 border-radius rounded-md text-[9px]">
					{source?.iataCode}
				</span>
				<p class="ml-2">{source?.city}</p>
			</div>
			<hr class="border-dashed border-[#606574] my-2" />
			<div
				class="flex justify-start"
				on:click={() => goto('/flights/search-query/des')}
				on:keydown={(e) => {
					if (e.key === 'Enter') {
						goto('/flights/search-query/des');
					}
				}}
			>
				<span class="border-solid border-2 px-2 py-1 border-radius rounded-md text-[9px]">
					{destination?.iataCode}
				</span>
				<p class="ml-2">{destination?.city}</p>
			</div>
		</div>
		<div>
			<button
				class="btn bg-transparent border-none p-0 py-0 hover:bg-transparent"
				on:click={handleSwapSourceAndDestination}
			>
				<SwapIcon />
			</button>
		</div>
	{/if}
</Card>
