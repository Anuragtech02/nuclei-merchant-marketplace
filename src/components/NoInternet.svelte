<script lang="ts">
	let isModalOpen: boolean = false;
	function handleClicKReload() {
		window.location.reload();
	}

	function toggleModal() {
		isModalOpen = !isModalOpen;
	}

	function handleOffline(e: Event) {
		toggleModal();
	}

	function handleOnline(e: Event) {
		toggleModal();
		window.location.reload();
	}
</script>

<svelte:window on:offline={handleOffline} on:online={handleOnline} />
<input type="checkbox" id="no-internet-modal" checked={isModalOpen} class="modal-toggle" />
<section class="modal z-999">
	<div class="modal-box bg-white">
		<div class="flex flex-col">
			<h2 class="text-lg black">Oops, No Internet</h2>
			<p class="text-sm text-stone-600">
				Seems like there's some issue with your internet connection.
			</p>
			<span class="text-xs mt-2">If the problem persists, try restarting the browser.</span>
			<label
				for="no-internet-modal"
				class="btn btn-primary border-0 outline-0 bg-primary hover:bg-primary w-full mt-4"
				role="button"
				tabindex="0"
				on:keydown={(e) => {
					if (e.key === 'Enter') {
						handleClicKReload();
					}
				}}
				on:click={handleClicKReload}>Reload</label
			>
		</div>
	</div>
</section>
