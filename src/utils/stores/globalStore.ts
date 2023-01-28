import { writable, type Updater, type Writable } from 'svelte/store';

export interface IFlightDetails {
	source: string;
	destination: string;
	departureDate: string; // ISO Date String
	returnDate: string; // ISO Date String
	travelClass: string; // Economy, Business, First
	travellers: number;
}

const defaultGlobalState = {
	source: 'BLR',
	destination: 'IDR',
	departureDate: new Date().toISOString(),
	returnDate: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(),
	travelClass: 'economy',
	travellers: 0
};

interface IGlobalStore {
	subscribe: Writable<IFlightDetails>['subscribe'];
	reset: () => void;
	update: (this: void, updater: Updater<IFlightDetails>) => void;
}

function createGlobalStore(): IGlobalStore {
	const { subscribe, update } = writable<IFlightDetails>(defaultGlobalState);

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
