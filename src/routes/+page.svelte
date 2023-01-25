<script lang="ts">
	import { Appbar } from '../components';
	import FlightDetails from '../components/FlightDetails.svelte';
	let balance: number = 1500;
</script>

<Appbar title="Flights" backLink="/">
	<div slot="extras" class="min-w-[35%] sm:min-w-[70%] flex justify-between items-center">
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
<section class="w-[80%] mx-auto mt-6">
	<FlightDetails />
</section>
