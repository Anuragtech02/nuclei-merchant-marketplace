<script lang="ts">
	import { ArrowRightIcon } from '../../../../assets/icons';
	import { getDateDayAndMonth } from '../../../../utils/functions';

	export let src: string;
	export let des: string;
	export let departureDate: string;
	export let returnDate: string;
	export let travellerCount: number;
	export let travellerClass: string;
</script>

<div class="flex-col text-white ml-2">
	<h3 class="flex justify-start gap-2 text-white items-center">
		<span>
			{src}
		</span>
		<ArrowRightIcon />
		<span>
			{des}
		</span>
	</h3>
	<p class="text-sm mt-2">
		{getDateDayAndMonth(departureDate)?.date + ' ' + getDateDayAndMonth(departureDate)?.month} | {travellerCount}
		Traveller{'(s)'} | {travellerClass}
	</p>
</div>
