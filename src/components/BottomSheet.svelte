<script lang="ts">
	export let id = '';
	export let classes = '';
	export let modalClasses = '';
	export let type = 'bottom';
	export let title = '';
	export let open: boolean = false;
</script>

<div>
	<input type="checkbox" {id} checked={open} class="modal-toggle" />
	<label for={id} class={`modal modal-bottom cursor-pointer ${modalClasses}`} {id}>
		<label for="" class={`modal-box ${classes} relative w-screen bg-bg`}>
			<div class="flex justify-center	pb-[1rem] relative w-full items-center">
				{#if $$slots.customHeaderComp}
					<slot name="customHeaderComp" />
				{:else}
					{#if type === 'bottom'}
						<div class="w-[40px] h-[4px] bg-stone-400 rounded" />
					{/if}
					{#if title?.length}
						<p
							class="text-md text-black font-medium absolute top-1/2 left-0 transform -translate-y-1/2"
						>
							{title}
						</p>
					{/if}
					<label
						for={id}
						class="btn btn-square btn-xs border-0 bg-white absolute top-1/2 right-0 transform -translate-y-1/2 hover:bg-primary custom-hover"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-4 w-4 stroke-primary"
							fill="none"
							viewBox="0 0 24 24"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							/></svg
						>
					</label>
				{/if}
			</div>
			<slot />
		</label>
	</label>
</div>

<style>
	.custom-hover:hover > svg {
		stroke: #fff;
	}
</style>
