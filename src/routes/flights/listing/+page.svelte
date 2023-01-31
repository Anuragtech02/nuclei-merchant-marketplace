<script lang="ts">
	import { page } from '$app/stores';
	import { Appbar } from '../../../components';
	import { getListingData } from '../../../utils/api/services';
	import type { IListingData } from '../../../utils/interfaces';

	// extract all params from query in URL
	let searchParams = $page.url.searchParams;

	const params = {} as any;

	searchParams?.forEach((value, key) => {
		params[key] = value;
	});

	$: console.log(params);

	let listingData: IListingData = {} as any;

	async function fetchListingData() {
		try {
			const res = await getListingData();
			listingData = res.data;
		} catch (error) {
			console.log('ERROR_FETCHING_LISTING_DATA', error);
		}
	}

	let flights: any[] = [];
</script>

<Appbar title="Listing Page" />

<section>
	<ul>
		{#each flights as flight}
			<li>
				<div>
					<img src="" alt="" />
				</div>
			</li>
		{/each}
	</ul>
</section>
