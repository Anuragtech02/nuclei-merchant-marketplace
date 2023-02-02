<script lang="ts">
	import { BottomSheet } from '../../../../components';

	let sortBy: string = 'price_asc';

	const SORT_OPTIONS = [
		{
			label: 'Price',
			subTitle: '(Cheapest First)',
			value: 'price_asc'
		},
		{
			label: 'Duration',
			subTitle: '(Shortest First)',
			value: 'duration_asc'
		},
		{
			label: 'Departure',
			subTitle: '(Night First)',
			value: 'departure_desc'
		},
		{
			label: 'Departure',
			subTitle: '(Morning First)',
			value: 'departure_asc'
		}
	];

	const STOP_OPTIONS = [
		{
			label: '0',
			value: 'non_stop'
		},
		{
			label: '1',
			value: '1'
		},
		{
			label: '2 +',
			value: '2+'
		}
	];

	function getSelectedStyling(option: any) {
		console.log(sortBy === option.value, { sortBy, option });
		return sortBy === option.value ? 'border-2' : 'border-0';
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
		<main class="p-4">
			<div>
				<h4>Sort By</h4>
				<div class="grid grid-rows-2 grid-flow-col gap-2 mt-2">
					{#each SORT_OPTIONS as option}
						<div
							class={`flex justify-between items-center bg-white rounded-lg p-4 px-5 outline-primary`}
							class:outline={sortBy === option.value}
						>
							<div
								on:click={() => {
									sortBy = option.value;
									console.log('Clicked');
								}}
								on:keydown={(e) => {
									if (e.key === 'Enter') {
										sortBy = option.value;
									}
								}}
							>
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
				<div class="flex justify-between">
					{#each STOP_OPTIONS as option}
						<div
							class="flex justify-between items-center bg-white rounded-lg p-4 px-5 border-primary"
						>
							<div>
								<h5>{option.label}</h5>
							</div>
							<input type="checkbox" name="stops" id={option.value} />
						</div>
					{/each}
				</div>
			</div>
		</main>
	</div>
</BottomSheet>
