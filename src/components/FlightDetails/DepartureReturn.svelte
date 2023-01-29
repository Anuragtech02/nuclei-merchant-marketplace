<script lang="ts">
	import { getDateDayAndMonth } from '../../utils/functions';
	import { GlobalStore } from '../../utils/stores/globalStore';
	import Card from '../Card.svelte';
	const { subscribe, update } = GlobalStore;
	let departureDate = '';
	let returnDate = '';
	let departureDateLocal: any = {};
	let returnDateLocal: any = {};

	subscribe((value) => {
		departureDate = value.searchRequest.departDate;
		returnDate = value.searchRequest.returnDate;
	});

	$: departureDate, (departureDateLocal = getDateDayAndMonth(departureDate));
	$: returnDate, (returnDateLocal = getDateDayAndMonth(returnDate));
</script>

<Card classes="flex justify-between">
	<div>
		<p>Departure</p>
		<h3>{`${departureDateLocal?.date} ${departureDateLocal?.month}`}</h3>
		<p>{departureDateLocal?.day}</p>
	</div>
	<div class="divider divider-horizontal" />
	<div>
		<p>Return</p>
		<h3>{`${returnDateLocal?.date} ${returnDateLocal?.month}`}</h3>
		<p>{returnDateLocal?.day}</p>
	</div>
</Card>

<style>
	p {
		@apply text-stone-400 text-[14px];
	}
</style>
