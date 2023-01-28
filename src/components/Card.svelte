<script lang="ts">
	export let classes: string = '';
</script>

<div class={`px-2 py-6 bg-white px-5 rounded-lg text-black ${classes} my-5`}>
	<slot />
</div>
