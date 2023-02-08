import { formatDate, getCityByCode } from '../../../../../utils/functions';

export function generateFilterObj(filters: {
	src: any;
	des: any;
	departDate: any;
	passenger: {
		adultCount: number;
		childCount: number;
		infantCount: number;
	};
	travellerClass: {
		key: any;
		value: any;
	};
	appliedSortFilter: Array<{
		tabId: string;
		sortId: string;
		filtersList: any[];
	}>;
}) {
	const params: any = filters;
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
