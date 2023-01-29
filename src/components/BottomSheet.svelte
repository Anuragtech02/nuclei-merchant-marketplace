<script lang="ts">
	export let id = '';
	export let classes = '';
</script>

<div>
	<input type="checkbox" {id} class="modal-toggle" />
	<label for={id} class="modal modal-bottom cursor-pointer" {id}>
		<label for="" class={`modal-box ${classes} relative w-screen bg-bg`}>
			<div class="flex justify-center	pb-[1rem] relative w-full items-center">
				<span class="block w-[40px] h-[4px] bg-stone-400 rounded" />
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
