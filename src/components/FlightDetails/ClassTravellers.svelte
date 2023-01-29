<script lang="ts">
	import { BottomSheet, Counter } from '..';
	import { TRAVEL_CLASS_OPTIONS, travellersOptions } from '../../utils/constants';
	import { GlobalStore } from '../../utils/stores/globalStore';
	import Card from '../Card.svelte';
	import Select from '../Select.svelte';
	const { subscribe, update } = GlobalStore;
	let travelClass = '';
	let travellers = 0;
	let adults = 1;
	let children = 0;
	let infants = 0;
	let maxTravellerDisabled = false;

	subscribe((value) => {
		travelClass = value.searchRequest.travellerClass;
		adults = value.searchRequest.adultCount;
		children = value.searchRequest.childCount;
		infants = value.searchRequest.infantCount;
	});

	function getAvailableTravellers() {
		return 9 - (adults + children + infants);
	}

	$: adults,
		children,
		infants,
		(maxTravellerDisabled = getAvailableTravellers() <= 0),
		(travellers = adults + children + infants);
</script>

<Card>
	<div class="custom-tc-container flex justify-between [&>label]:flex-1">
		<label for="traveller-class">
			<span>Class</span>
			<div>
				<p>{travelClass}</p>
				<img src="icons/arrow-down.svg" alt="arrow-down" class="w-4 h-3" />
			</div>
		</label>
		<div class="divider divider-horizontal" />
		<label for="traveller-class">
			<span>Traveller{'(s)'}</span>
			<div>
				<p>{travellers}</p>
				<img src="icons/arrow-down.svg" alt="arrow-down" class="w-4 h-3" />
			</div>
		</label>
	</div>

	<BottomSheet id="traveller-class">
		<div>
			<h4 class="font-medium">Select Traveller{'(s)'}</h4>
			<div class="mt-2 custom-data-container">
				<div class="flex justify-between">
					<div>
						<p>Adults</p>
						<span>12 years and above</span>
					</div>
					<Counter bind:count={adults} maxDisabled={maxTravellerDisabled} />
				</div>
				<div class="flex justify-between">
					<div>
						<p>Children</p>
						<span>2 to 12 years</span>
					</div>
					<Counter bind:count={children} maxDisabled={maxTravellerDisabled} />
				</div>
				<div class="flex justify-between">
					<div>
						<p>Infants</p>
						<span>Less than 2 years</span>
					</div>
					<Counter bind:count={infants} maxDisabled={maxTravellerDisabled} />
				</div>
			</div>
		</div>
		<div class="mt-4">
			<h4 class="font-medium">Select Class</h4>
			<div class="mt-2">
				{#each TRAVEL_CLASS_OPTIONS as tClass}
					<div class="form-control">
						<label class="label cursor-pointer p-0 my-2 flex justify-start">
							<input
								type="radio"
								name="radio-1"
								class="radio border-primary checked:bg-primary checked:border-primary w-4 h-4"
								value={tClass}
								bind:group={travelClass}
							/>
							<span class="label-text ml-2 text-black">{tClass}</span>
						</label>
					</div>
				{/each}
			</div>
		</div>
	</BottomSheet>
</Card>

<style>
	.custom-data-container > div > div > span {
		font-size: 14px;
		color: #7a7a7a;
	}
	.custom-data-container > div > div > p {
		font-size: 16px;
		color: #000000;
	}
	.custom-data-container > div > div {
		margin: 0.5rem 0;
	}
	.custom-tc-container span {
		font-size: 14px;
		color: #7a7a7a;
	}
	.custom-tc-container label > div {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		margin-top: 0.5rem;
	}
</style>
