<script lang="ts">
	import { BottomSheet, Counter } from '..';
	import { travelClassOtions, travellersOptions } from '../../utils/constants';
	import { GlobalStore } from '../../utils/stores/globalStore';
	import Card from '../Card.svelte';
	import Select from '../Select.svelte';
	const { subscribe, update } = GlobalStore;
	let travelClass = '';
	let travellers = 0;
	let adults = 1;
	let children = 0;
	let infants = 0;
	let maxDisabledAdults = false;
	let maxDisabledChildren = false;
	let maxDisabledInfants = false;

	subscribe((value) => {
		travelClass = value.travelClass;
		travellers = value.travellers;
	});

	function getAvailableTravellers() {
		return 9 - (adults + children + infants);
	}

	$: adults, (maxDisabledAdults = getAvailableTravellers() <= 0);
	$: children, (maxDisabledChildren = getAvailableTravellers() <= 0);
	$: infants, (maxDisabledInfants = getAvailableTravellers() <= 0);

	let paragraphClasses = 'text-stone-400 text-[14px]';
</script>

<Card classes="flex justify-between">
	<Select options={travelClassOtions} value={travelClass} />
	<div class="divider divider-horizontal" />
	<Select options={travellersOptions} value={travellers} />
	<label for="traveller-class">Class</label>
	<BottomSheet id="traveller-class">
		<h4>Select Traveller{'(s)'}</h4>
		<div class="flex justify-between">
			<div>
				<p>Adults</p>
				<span>12 years and above</span>
			</div>
			<Counter bind:count={adults} maxDisabled={maxDisabledAdults} />
		</div>
	</BottomSheet>
</Card>
