import type { IHomeData, IUpcomingBookingsResponse, IWalletResponse } from '../interfaces';
import API from './config';

function getListingData() {
	return API.get('/listingMock_NwIjYH5pS.json');
}

function getHomeData() {
	return API.get<IHomeData>('/home_dYK52B_1B.json');
}

function getUpcomingBookings() {
	return API.get<IUpcomingBookingsResponse>('/upcomingBookings_MXqcdQN6I.json');
}

function getWalletData() {
	return API.get<IWalletResponse>('/wallet_cEEHpgpWm3.json');
}

export { getListingData, getHomeData, getUpcomingBookings, getWalletData };
