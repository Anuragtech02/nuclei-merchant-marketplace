<script lang="ts">
	import '../app.css';
</script>

<main class="min-h-screen bg-bg">
	<slot />
</main>

<style>
	@media screen and (max-width: 786px) {
		main {
			padding: 0 1rem;
		}
	}
</style>
