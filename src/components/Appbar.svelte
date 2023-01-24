<script lang="ts">
	export let title: string = '';
	export let backLink: string = '';
</script>

<nav class="w-full h-12 bg-[#032F49]">
	<div class="w-full max-w-screen-sm h-full mx-auto flex justify-between items-center text-white">
		<div class="flex justify-start flex-1">
			{#if backLink?.length}
				<a href={backLink} class="back-link">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="feather feather-arrow-left"
					>
						<line x1="19" y1="12" x2="5" y2="12" />
						<polyline points="12 19 5 12 12 5" />
					</svg>
				</a>
			{/if}
			<p class="ml-2">{title}</p>
		</div>
		<slot name="extras" class="min-w-[30%] flex justify-between" />
	</div>
</nav>
