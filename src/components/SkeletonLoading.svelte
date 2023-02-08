<script lang="ts">
	export let showImage: boolean = false;
	export let imageShape: string = 'circle';
	export let length: string = 'long';
	export let bordered: boolean = false;
</script>

<div class={`${bordered ? 'border' : ''} border-stone-300 rounded-md p-4 max-w-sm w-full mx-auto`}>
	<div class="animate-pulse flex space-x-4">
		{#if showImage}
			<div
				class={`${imageShape === 'circle' ? 'rounded-full' : 'rounded-lg'} bg-slate-700 h-10 w-10`}
			/>
		{/if}
		<div class="flex-1 space-y-6 py-1">
			<div class="h-2 bg-slate-700 rounded" />
			<div class="space-y-2">
				{#if length === 'long'}
					<div class="grid grid-cols-3 gap-4">
						<div class="h-2 bg-slate-700 rounded col-span-2" />
						<div class="h-2 bg-slate-700 rounded col-span-1" />
					</div>
				{/if}
				<div class="h-2 bg-slate-700 rounded" />
			</div>
		</div>
	</div>
</div>
