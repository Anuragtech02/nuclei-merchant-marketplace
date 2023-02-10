import type {
	IHomeData,
	IListingData,
	ISortFilterOptions,
	IUpcomingBookingsResponse,
	IWalletResponse
} from '../interfaces';
import { API_COMMON, API_FLIGHT_TICKET, API_LISTING, API_LANDING } from './config';
import type { IListingPageSearchBody } from './RequestBodyInterfaces';

function getListingData(body: IListingPageSearchBody) {
	return API_LISTING.post<IListingData>('/GetFlightsSearchListV2', body);
}

function getHomeData() {
	return API_LANDING.post<IHomeData>('/getConfig');
}

function getUpcomingBookings() {
	return API_FLIGHT_TICKET.post<IUpcomingBookingsResponse>('/GetAllBookings');
}

function getWalletData() {
	return API_COMMON.post<IWalletResponse>('/GetUserWallet');
}

function getPopularCities() {
	return API_LANDING.post('/getPopularCities');
}

function searchCity(searchText: string) {
	return API_LANDING.post('/getAirportSearchResults', {
		searchText
	});
}

function getSortFilterOptions(body: IListingPageSearchBody) {
	return API_LISTING.post<ISortFilterOptions>('/FetchFlightSortFilters', body);
}

export {
	getListingData,
	getHomeData,
	getUpcomingBookings,
	getWalletData,
	getPopularCities,
	searchCity,
	getSortFilterOptions
};
