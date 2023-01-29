<script lang="ts">
	import { Appbar, SourceDestination, DepartureReturn, ClassTravellers } from '../components';
	let balance: number = 1500;
</script>

<Appbar title="Flights" backLink="/">
	<div slot="extras" class="flex justify-between items-center gap-2">
		<button class="btn py-[4px] px-[16px] bg-[#1BA4F7] text-white">
			<img src="/icons/wallet.svg" alt="wallet" /> &nbsp; ₹ {balance}
		</button>
		<button class="btn bg-[#1BA4F7] text-white">
			<img src="/icons/percentage.svg" alt="offers" />
		</button>
		<button class="btn bg-transparent border-none p-0 ml-2">
			<img src="/icons/kebab-menu.svg" alt="menu" />
		</button>
	</div>
</Appbar>
<section class="w-full max-w-screen-sm mx-auto mt-6 sm:px-2">
	<SourceDestination />
	<DepartureReturn />
	<ClassTravellers />
	<div>
		<label for="non-stop" class="flex justify-start items-center">
			<input
				type="checkbox"
				id="non-stop"
				class="border-0 outline-0 accent-white border border-primary rounded-md checked:accent-primary checked:text-white"
			/>
			<span class="ml-2 text-sm text-stone-600"> Show only non-stop flights</span></label
		>
		<button class="btn bg-primary text-white w-full mt-4">Search</button>
	</div>
</section>
