<script lang="ts">
	export let options: Array<{
		value: string | number;
		label: string | number;
	}> = [];
	export let value = '' as string | number;
	export let classes = '';
	export let keepFirstSelected: boolean = true;
</script>

<div class={`form-control flex-1 max-w-xs ${classes}`}>
	<label for="class" class="label p-0">
		<span class="label-text font-normal text-stone-400">Class</span>
	</label>
	<select
		id="class"
		class="select select-ghost border-0 bg-transparent p-0 font-medium focus:text-black focus:outline-0 h-[2rem] min-h-[2rem]"
		bind:value
	>
		{#if keepFirstSelected}
			<option selected value={options[0].value}>{options[0].label}</option>
			{#if options.length > 1}
				{#each options?.slice(1) as option}
					<option value={option.value}>{option.label}</option>
				{/each}
			{/if}
		{/if}
		{#if !keepFirstSelected}
			{#each options as option}
				<option value={option.value}>{option.label}</option>
			{/each}
		{/if}
	</select>
</div>
