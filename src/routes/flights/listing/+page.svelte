<script lang="ts">
	import { page } from '$app/stores';
	import { Appbar } from '../../../components';
	import { getListingData } from '../../../utils/api/services';
	import { getCityByCode } from '../../../utils/functions';
	import type { IListingData } from '../../../utils/interfaces';
	import CustomTitleComp from './CustomTitleComp.svelte';

	let travellerCount = 0;

	// extract all params from query in URL
	let searchParams = $page.url.searchParams;

	const params = {} as any;

	searchParams?.forEach((value, key) => {
		params[key] = value;
	});

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

	$: params.adultCount,
		params.childCount,
		params.infantCount,
		(travellerCount =
			parseInt(params.adultCount) + parseInt(params.childCount) + parseInt(params.infantCount));
</script>

<Appbar title="Listing Page" customTitleComp={true}>
	<div slot="customTitleComp">
		<CustomTitleComp
			src={`${getCityByCode(params?.src)}`}
			des={`${getCityByCode(params?.des)}`}
			departureDate={params?.departDate}
			returnDate={params?.returnDate}
			{travellerCount}
			travellerClass={params?.travellerClass}
		/>
	</div>
	<div slot="extras">
		<button class="btn bg-accent hover:bg-accent btn-sm btn-square">
			<img src="/icons/edit.svg" alt="edit" />
		</button>
	</div>
</Appbar>

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
