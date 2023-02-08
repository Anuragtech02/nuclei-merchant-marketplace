import { writable, type Updater, type Writable } from 'svelte/store';
import type { IBooking, ISearchRequest } from '../interfaces';

const defaultFlightDetails: ISearchRequest = {} as ISearchRequest;

const defaultUpcomingBookings: IBooking[] = [];

const defaultRecentSearches: IRecentSearch[] = [];

const defaultGlobalState = {
	searchRequest: defaultFlightDetails,
	upcomingBookings: defaultUpcomingBookings,
	recentSearches: defaultRecentSearches,
	isLoading: true
};

export interface IRecentSearch {
	id: string; // ISO Date String
	createdAt: string; // ISO Date String
	city: string;
	iataCode: string;
	name: string;
}

export interface IGlobalStoreData {
	searchRequest: ISearchRequest;
	upcomingBookings: IBooking[];
	recentSearches: IRecentSearch[];
	isLoading: boolean;
}

interface IGlobalStore {
	subscribe: Writable<IGlobalStoreData>['subscribe'];
	reset: () => void;
	update: (this: void, updater: Updater<IGlobalStoreData>) => void;
}

function createGlobalStore(): IGlobalStore {
	const { subscribe, update } = writable<IGlobalStoreData>(defaultGlobalState);

	function reset() {
		update(() => defaultGlobalState);
	}

	return {
		subscribe,
		update,
		reset
	};
}

export const GlobalStore = createGlobalStore();

export default GlobalStore;
