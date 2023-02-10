import { LS_RECENT_SEARCHES } from '../../../utils/constants';
import { formatDate, getCityByCode } from '../../../utils/functions';
import type { IRecentSearch } from '../../../utils/stores/globalStore';
import GlobalStore from '../../../utils/stores/globalStore';
const { update } = GlobalStore;

export interface IParams {
	adultCount: string;
	childCount: string;
	departDate: string;
	des: string;
	infantCount: string;
	isNonStop: string;
	returnDate: string;
	src: string;
	travellerClass: string;
}
export function updateRecentSearches(params: IParams) {
	// check if local storage has recent searches
	if (!params.departDate) return;
	const recentSearchesFromLocalStorage = localStorage.getItem(LS_RECENT_SEARCHES);
	const newSearchItem: IRecentSearch = {
		id: Date.now().toString(),
		createdAt: Date.now().toString(),
		src: {
			iataCode: params?.src,
			name: String(getCityByCode(params?.src)),
			city: String(getCityByCode(params?.src)),
			countryCode: 'IN'
		},
		des: {
			iataCode: params?.des,
			name: String(getCityByCode(params?.des)),
			city: String(getCityByCode(params?.des)),
			countryCode: 'IN'
		},
		departDate: params?.departDate
	};
	let newRecentSearches: IRecentSearch[] = [];
	if (recentSearchesFromLocalStorage) {
		const recentSearches = JSON.parse(recentSearchesFromLocalStorage);
		// update the array of recent searches in store and LS
		newRecentSearches = recentSearches;
		if (recentSearches?.length === 3) {
			newRecentSearches.pop();
		}
		if (
			!recentSearches.find(
				(item: IRecentSearch) =>
					item.src.iataCode === newSearchItem.src.iataCode &&
					item.des.iataCode === newSearchItem.des.iataCode &&
					new Date(parseInt(item.departDate)).getDate() ===
						new Date(parseInt(newSearchItem.departDate)).getDate() &&
					new Date(parseInt(item.departDate)).getMonth() ===
						new Date(parseInt(newSearchItem.departDate)).getMonth() &&
					new Date(parseInt(item.departDate)).getFullYear() ===
						new Date(parseInt(newSearchItem.departDate)).getFullYear()
			)
		) {
			newRecentSearches = [newSearchItem, ...newRecentSearches];
			update((value) => {
				value.recentSearches = recentSearches;
				return value;
			});
		}
	} else {
		newRecentSearches = [newSearchItem];
	}
	// update store and LS
	localStorage.setItem(LS_RECENT_SEARCHES, JSON.stringify(newRecentSearches));
	update((value) => {
		value.recentSearches = newRecentSearches;
		return value;
	});
}

export function getSearchRequestObj(params: IParams) {
	return {
		src: {
			iataCode: params?.src,
			city: String(getCityByCode(params?.src)),
			countryCode: 'IN'
		},
		des: {
			iataCode: params?.des,
			city: String(getCityByCode(params?.des)),
			countryCode: 'IN'
		},
		departDate: formatDate(params?.departDate),
		passenger: {
			adultCount: parseInt(params?.adultCount),
			childCount: parseInt(params?.childCount),
			infantCount: parseInt(params?.infantCount)
		},
		travellerClass: {
			key: params?.travellerClass,
			value: params?.travellerClass
		},
		appliedSortFilter: [
			{
				tabId: 'ONWARD',
				sortId: '1',
				filtersList: []
			}
		],
		partnerCountry: 'IN'
	};
}
