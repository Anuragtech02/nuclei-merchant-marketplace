import { writable, type Writable } from 'svelte/store';

interface IGlobalStore {
	startLocation: string; // code, ex: BLR
	endLocation: string;
	setStartLocation: (location: string) => void;
	setEndLocation: (location: string) => void;
}

export const GlobalStore: Writable<IGlobalStore> = writable({
	startLocation: 'BLR',
	endLocation: 'HYD',
	setStartLocation: (location: string) => {
		GlobalStore.update((store) => {
			store.startLocation = location;
			return store;
		});
	},
	setEndLocation: (location: string) => {
		GlobalStore.update((store) => {
			store.endLocation = location;
			return store;
		});
	}
});
