<script lang="ts">
	export let count: number = 0;
	export let min: number = 0;
	export let max: number = 9;
	export let maxDisabled: boolean;
</script>

<div
	aria-label="counter"
	class="flex justify-between items-center h-fit gap-1 bg-white text-black rounded-xl border border-stone-200 min-w-[75px] h-[38px]"
>
	<button class="bg-inherit px-2 pl-4" on:click={() => count--} disabled={count <= 1}>-</button>
	<input
		type="number"
		class="bg-inherit card-sub-heading focus:outline-none text-center w-full flex items-center outline-none min-w-[20px] custom-remove-styling"
		{min}
		{max}
		bind:value={count}
	/>
	<button class="bg-inherit px-2 pr-4" on:click={() => count++} disabled={maxDisabled ?? count >= 8}
		>+</button
	>
</div>

<style>
	input[type='number']::-webkit-inner-spin-button,
	input[type='number']::-webkit-outer-spin-button {
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		margin: 0;
	}
	button:disabled {
		opacity: 0.5;
	}
</style>
