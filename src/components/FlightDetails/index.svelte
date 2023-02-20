<script lang="ts">
	import { goto } from '$app/navigation';
	import { ClassTravellers, DepartureReturn, SourceDestination } from '..';
	import GlobalStore from '../../utils/stores/globalStore.store';
	import type { ISearchRequest } from '../../utils/interfaces';
	const { subscribe } = GlobalStore;

	export let afterClickSearch: () => void = () => {};

	export let isOpenBottomSheet: boolean = false;

	let isNonStopChecked: boolean = false;

	let searchRequest: ISearchRequest = {} as ISearchRequest;
	let alertMessage: string = '';

	subscribe((value) => {
		searchRequest = value.searchRequest;
	});

	function validateFields() {
		if (!searchRequest.src.iataCode) {
			alertMessage = 'Please select a source';
			return;
		}
		if (!searchRequest.des.iataCode) {
			alertMessage = 'Please select a destination';
			return;
		}
		if (!searchRequest.departDate) {
			alertMessage = 'Please select a departure date';
			return;
		}
		if (!searchRequest.adultCount) {
			alertMessage = 'Please select at least one adult';
			return;
		}
		if (!searchRequest.travellerClass) {
			alertMessage = 'Please select a traveller class';
			return;
		}
	}

	// adult + children = 9 and infants <= adults

	function handleClickSearch() {
		validateFields();
		let searchQuery =
			'?src=' +
			searchRequest.src.iataCode +
			'&des=' +
			searchRequest.des.iataCode +
			'&departDate=' +
			searchRequest.departDate +
			'&returnDate=' +
			searchRequest.returnDate +
			'&adultCount=' +
			searchRequest.adultCount +
			'&childCount=' +
			searchRequest.childCount +
			'&infantCount=' +
			searchRequest.infantCount +
			'&travellerClass=' +
			searchRequest.travellerClass +
			'&isNonStop=' +
			isNonStopChecked;

		goto(`/flights/listing${searchQuery}`);
		if (afterClickSearch) {
			console.log('After Click Search');
			afterClickSearch();
		}
	}
</script>

<SourceDestination />
<DepartureReturn />
<ClassTravellers {isOpenBottomSheet} />

<div>
	<label for="non-stop" class="flex justify-start items-center">
		<input
			type="checkbox"
			bind:checked={isNonStopChecked}
			id="non-stop"
			class="border-0 outline-0 accent-white border border-primary rounded-md checked:accent-primary checked:text-white"
		/>
		<span class="ml-2 text-sm text-stone-600"> Show only non-stop flights</span></label
	>
	<label
		for="modify-search"
		class="btn bg-primary text-white w-full mt-4"
		on:click={handleClickSearch}
		tabindex="0"
		role="button"
		on:keydown={(e) => {
			if (e.key === 'Enter') {
				handleClickSearch();
			}
		}}>Search</label
	>
	{#if alertMessage?.length > 0}
		<div class="alert alert-error shadow-lg">
			<div>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="stroke-current flex-shrink-0 h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
					/></svg
				>
				<span>{alertMessage}</span>
			</div>
		</div>
	{/if}
</div>
