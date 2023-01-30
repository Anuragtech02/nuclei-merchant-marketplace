<script lang="ts">
	import { page } from '$app/stores';
	export let title: string = '';
	export let backLink: string = '';

	function getBackLink() {
		return $page.url.pathname.substring(0, $page.url.pathname.lastIndexOf('/'));
	}
</script>

<nav class="w-full h-[80px] px-4 fixed top-0 left-0 bg-primary">
	<div class="w-full max-w-screen-sm h-full mx-auto flex justify-between items-center text-white">
		<div class="flex justify-start items-center">
			<a href={backLink || getBackLink()} class="back-link">
				<img src="/icons/back.svg" alt="back" class="w-4 h-3" />
			</a>
			<p class="ml-3">{title}</p>
		</div>
		<slot name="extras" />
	</div>
</nav>
