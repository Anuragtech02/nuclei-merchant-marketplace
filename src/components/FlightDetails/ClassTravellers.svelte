<script lang="ts">
	import { travelClassOtions, travellersOptions } from '../../utils/constants';
	import { GlobalStore } from '../../utils/stores/globalStore';
	import Card from '../Card.svelte';
	import Select from '../Select.svelte';
	const { subscribe, update } = GlobalStore;
	let travelClass = '';
	let travellers = 0;

	subscribe((value) => {
		travelClass = value.travelClass;
		travellers = value.travellers;
	});

	let paragraphClasses = 'text-stone-400 text-[14px]';
</script>

<Card classes="flex justify-between">
	<Select options={travelClassOtions} value={travelClass} />
	<div class="divider divider-horizontal" />
	<Select options={travellersOptions} value={travellers} />
</Card>
