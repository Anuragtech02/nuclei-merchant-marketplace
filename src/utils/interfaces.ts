export interface IResponse {
	responseCode: string;
	responseCodeCause: string;
	responseMessage: string;
}

export interface IDisplayInfo {
	currency_symbol: string;
	toast_message: string;
	overlay_message: string;
}

export interface IWalletDetails {
	walletName: string;
	walletTotalBalance: number;
	walletAppliedRedeemedAmount: number;
	walletRollbackAmount: number;
	userBlocked: boolean;
	banner: string;
	displayInfo: IDisplayInfo;
}

export interface IWalletResponse {
	response: Response;
	walletDetails: IWalletDetails;
}

export interface IBooking {
	id: string;
	title: string;
	subtitle: string;
	thirdTitle: string;
	imageUrl: string;
	ctaButton: any[];
}

export interface IUpcomingBookingsResponse {
	booking: IBooking[];
	totalRecords: number;
}

export interface Status {
	responseCode: string;
	responseCodeCause: string;
	responseMessage: string;
}

export interface ConfigMap {
	MIN_TOTAL_GUEST: string;
	NON_STOP_FLIGHT_LANDING: string;
	MAX_TOTAL_GUEST: string;
	CACHING_TIME_IN_MILLISECOND: string;
	SEARCH_CITY_REGEX: string;
	PASSPORT_NUMBER_REGEX: string;
	ONWARD_NUMBER_OF_STOP_FILTER_ID: string;
	MAX_CALENDER_DAYS: string;
	SEARCH_CITY_REGEX_ERROR_MESSAGE: string;
	GST_ENABLED: string;
	PASSPORT_DATE_MAX_YEARS: string;
	RETURN_NUMBER_OF_STOP_FILTER_ID: string;
	BOOKING_RESULT_PER_PAGE: string;
	NON_STOP_FLIGHT_FILTER_ID: string;
	LISTING_LOADING_MESSAGE: string;
}

export interface Traveller {
	key: string;
	value: string;
}

export interface Guest {
	guestType: string;
	textName: string;
	subTextName: string;
	defaultValue: number;
	minValue: number;
	maxValue: number;
	displayOrder: number;
	errorMessage: string;
}

export interface AppliedFilterValueList {
	filterValues: string[];
}

export interface FiltersList {
	filterId: number;
	appliedFilterValueList: AppliedFilterValueList;
}

export interface DefaultSortFilter {
	tabId: string;
	sortId: string;
	filtersList: FiltersList[];
}

export interface ILocationObj {
	iataCode: string;
	city: string;
	name: string;
	countryCode: string;
	iconUrl: string;
}

export interface ISearchRequest {
	src: ILocationObj;
	des: ILocationObj;
	travellerClass: string;
	departDate: string;
	returnDate: string;
	adultCount: number;
	childCount: number;
	infantCount: number;
	isRoundTrip: boolean;
	partnerCountry: string;
	partnerCurrency: string;
	configMap: ConfigMap;
	travellers: Traveller[];
	guests: Guest[];
	defaultSortFilter: DefaultSortFilter;
}

export interface Payload {
	['wallet-info']: string;
}

export interface CategorySdkConfig {
	couponEnabled: boolean;
	walletEnabled: boolean;
	payload: Payload;
}

export interface IHomeData {
	status: Status;
	searchRequest: ISearchRequest;
	categorySdkConfig: CategorySdkConfig;
}