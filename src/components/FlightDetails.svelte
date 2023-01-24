<script lang="ts">
	// subscribe to GlobalStore
	import { GlobalStore } from '../utils/globalStore';
	import { getCityByCode } from '../utils/functions';
	const { subscribe, update } = GlobalStore;
	let startLocation: string = '';
	let endLocation: string = '';
	subscribe((value) => {
		startLocation = value.startLocation;
		endLocation = value.endLocation;
	});
</script>

<section class="w-[80%] mx-auto">
	<div class="p-2 flex justify-between items-center">
		<div class="flex-col items-center">
			<div>
				<img src="icons/dot.svg" alt="dot" />
			</div>
			<div class="w-[2px] bg-black h-[5px]" />
			<div>
				<img src="icons/plane.svg" alt="airplane" />
			</div>
		</div>
		<div class="flex-1">
			<div class="flex justify-start">
				<span class="border-solid border-2 px-2 py-1 border-radius rounded-md">
					{startLocation}
				</span>
				<p class="ml-2">{getCityByCode(startLocation)}</p>
			</div>
			<hr />
			<div class="flex justify-start">
				<span class="border-solid border-2 px-2 py-1 border-radius rounded-md">
					{endLocation}
				</span>
				<p class="ml-2">{getCityByCode(endLocation)}</p>
			</div>
		</div>
		<div>
			<button>
				<img src="icons/swap.svg" alt="swap" />
			</button>
		</div>
	</div>
</section>
