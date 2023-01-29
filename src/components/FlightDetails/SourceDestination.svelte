<script lang="ts">
	const FLIGHT_DETAILSL_HEIGHT = 80;
	import GlobalStore from '../../utils/stores/globalStore';
	import { getCityByCode } from '../../utils/functions';
	import Card from '../Card.svelte';
	import type { ILocationObj, ISearchRequest } from '../../utils/interfaces';
	const { subscribe, update } = GlobalStore;
	let searchRequest: ISearchRequest = {} as any;
	let source: ILocationObj = {} as any;
	let destination: ILocationObj = {} as any;

	$: searchRequest, (source = searchRequest?.src);
	$: searchRequest, (destination = searchRequest?.des);

	subscribe((value) => {
		searchRequest = value.searchRequest;
	});
</script>

<Card classes="flex justify-between items-center gap-2">
	<div class={`flex flex-col items-center justify-between h-[${FLIGHT_DETAILSL_HEIGHT}px] gap-1`}>
		<div>
			<img src="icons/dot.svg" alt="dot" />
		</div>
		<div class="w-[1px] bg-black flex-1" />
		<div>
			<img src="icons/plane.svg" alt="airplane" />
		</div>
	</div>
	<div class={`flex-1 h-[${FLIGHT_DETAILSL_HEIGHT}px] flex flex-col justify-between`}>
		<div class="flex justify-start">
			<span class="border-solid border-2 px-2 py-1 border-radius rounded-md text-[9px]">
				{source?.iataCode}
			</span>
			<p class="ml-2">{source?.city}</p>
		</div>
		<hr class="border-dashed border-[#606574] my-2" />
		<div class="flex justify-start">
			<span class="border-solid border-2 px-2 py-1 border-radius rounded-md text-[9px]">
				{destination?.iataCode}
			</span>
			<p class="ml-2">{destination?.city}</p>
		</div>
	</div>
	<div>
		<button class="btn bg-transparent border-none p-0 py-0 hover:bg-transparent">
			<img src="icons/swap.svg" alt="swap" />
		</button>
	</div>
</Card>
