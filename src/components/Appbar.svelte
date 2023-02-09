<script lang="ts">
	import { page } from '$app/stores';
	import { BackIcon } from '../assets/icons';
	import { HEADER_HEIGHT } from '../utils/constants';
	export let title: string = '';
	export let backLink: string = '';
	export let customTitleComp: boolean = false;

	function getBackLink() {
		return $page.url.pathname.substring(0, $page.url.pathname.lastIndexOf('/'));
	}
</script>

<nav class={`w-full h-[80px] px-4 fixed top-0 left-0 bg-primary`}>
	<div class="w-full max-w-screen-sm h-full mx-auto flex justify-between items-center text-white">
		<div class="flex justify-start items-center">
			<a href={backLink || getBackLink()} class="back-link">
				<BackIcon />
			</a>
			{#if customTitleComp}
				<slot name="customTitleComp" />
			{:else}
				<p class="ml-3">{title}</p>
			{/if}
		</div>
		<slot name="extras" />
	</div>
</nav>

<style>
	nav {
		z-index: 100;
	}
</style>
