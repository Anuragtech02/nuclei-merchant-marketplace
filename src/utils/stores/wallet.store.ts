import { writable, type Updater, type Writable } from 'svelte/store';

const defaultWalletState = {
	balance: 0,
	isLoading: true
};

export interface IWalletStoreData {
	balance: number;
}

interface IWalletStore {
	subscribe: Writable<IWalletStoreData>['subscribe'];
	reset: () => void;
	update: (this: void, updater: Updater<IWalletStoreData>) => void;
}

function createWalletStore(): IWalletStore {
	const { subscribe, update } = writable<IWalletStoreData>(defaultWalletState);

	function reset() {
		update(() => defaultWalletState);
	}

	return {
		subscribe,
		update,
		reset
	};
}

export const WalletStore = createWalletStore();

export default WalletStore;
