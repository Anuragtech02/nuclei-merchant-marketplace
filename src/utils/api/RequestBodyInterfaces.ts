export interface Src {
	iataCode: string;
	city: string;
	countryCode: string;
}

export interface Des {
	iataCode: string;
	city: string;
	countryCode: string;
}

export interface Passenger {
	adultCount: number;
	infantCount: number;
	childCount: number;
}

export interface TravellerClass {
	key: string;
	value: string;
}

export interface AppliedSortFilter {
	tabId: string;
	sortId: string;
	filtersList: any[];
}

export interface IListingPageSearchBody {
	src: Src;
	des: Des;
	departDate: string;
	partnerCountry: string;
	passenger: Passenger;
	travellerClass: TravellerClass;
	appliedSortFilter: AppliedSortFilter[];
}
