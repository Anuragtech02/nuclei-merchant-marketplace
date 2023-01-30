<script lang="ts">
	import type { IRecentSearch } from '../../../../utils/stores/globalStore';

	export let item: IRecentSearch;
	export let type: 'recent' | 'new';
</script>

<div class="flex justify-start items-center">
	<img src={type === 'new' ? '/icons/location.svg' : '/icons/recent.svg'} alt="recent" />
	<div class="ml-4">
		<h5>{item.city}</h5>
		<span class="text-xs text-stone-500">{item.iataCode} - {item.name}</span>
	</div>
</div>
