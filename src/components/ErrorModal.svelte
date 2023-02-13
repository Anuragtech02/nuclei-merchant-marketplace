<script lang="ts">
	export let modalId: string;
	function handleClickReload() {
		window.location.reload();
	}
</script>

<input type="checkbox" id={modalId} class="modal-toggle" />
<section class="modal z-999">
	<div class="modal-box bg-white">
		<div class="flex flex-col">
			<h2 class="text-lg black">Oops, Our Mistake</h2>
			<p class="text-sm text-stone-600">Seems like something is wrong on our end.</p>
			<span class="text-xs mt-2">If the problem persists, try restarting the browser.</span>
			<label
				for={modalId}
				class="btn btn-primary bg-primary w-full mt-4"
				role="button"
				tabindex="0"
				on:keydown={(e) => {
					if (e.key === 'Enter') {
						handleClickReload();
					}
				}}
				on:click={handleClickReload}>Reload</label
			>
		</div>
	</div>
</section>
