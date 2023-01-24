<script lang="ts">
	export let title: string = '';
	export let backLink: string = '';
</script>

<nav class="w-full h-[80px] bg-[#032F49] px-4 sticky top-0">
	<div class="w-full max-w-screen-sm h-full mx-auto flex justify-between items-center text-white">
		<div class="flex justify-start flex-1 items-center">
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
