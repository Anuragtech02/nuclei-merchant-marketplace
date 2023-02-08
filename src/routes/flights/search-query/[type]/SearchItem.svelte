<script lang="ts">
	import { LocationIcon, RecentIcon } from '../../../../assets/icons';
	import type { IRecentSearch } from '../../../../utils/stores/globalStore';

	export let item: IRecentSearch;
	export let type: 'recent' | 'new';
</script>

<div class="flex justify-start items-center">
	{#if type === 'new'}
		<LocationIcon />
	{:else}
		<RecentIcon />
	{/if}
	<div class="ml-4">
		<h5>{item.city}</h5>
		<span class="text-xs text-stone-500">{item.iataCode} - {item.name}</span>
	</div>
</div>
