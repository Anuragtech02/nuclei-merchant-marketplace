<script lang="ts">
	export let title: string = '';
	export let backLink: string = '';
</script>

<nav class="w-full h-[80px] bg-primary px-4 sticky top-0">
	<div class="w-full max-w-screen-sm h-full mx-auto flex justify-between items-center text-white">
		<div class="flex justify-start items-center">
			{#if backLink?.length}
				<a href={backLink} class="back-link">
					<img src="icons/back.svg" alt="back" class="w-4 h-3" />
				</a>
			{/if}
			<p class="ml-3">{title}</p>
		</div>
		<slot name="extras" />
	</div>
</nav>

<style>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;

	nav::after {
		content: '';
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 80px;
		@apply bg-primary;
		z-index: 0;
	}
	nav > div {
		position: relative;
		z-index: 5;
	}
</style>
