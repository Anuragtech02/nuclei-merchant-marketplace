<script lang="ts">
	import '../app.css';
</script>

<main class="min-h-screen bg-bg mt-[80px] pt-2">
	<slot />
</main>

<style>
	@media screen and (max-width: 786px) {
		main {
			padding: 0 1rem;
		}
	}
</style>
