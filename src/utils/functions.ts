import { CITIES } from './constants';

export function getCityByCode(code: string): string | undefined {
	return CITIES.find((city) => city.code === code)?.name;
}

export function getDateDayAndMonth(dateStr: string) {
	const dateObj = new Date(parseInt(dateStr));
	const date = dateObj.getDate();
	const month = dateObj.toLocaleString('default', { month: 'short' });
	const day = dateObj.toLocaleString('default', { weekday: 'short' });
	return {
		date,
		month,
		day
	};
}

export const debounce = <F extends (...args: Parameters<F>) => ReturnType<F>>(
	fn: F,
	delay: number
) => {
	let timeout: ReturnType<typeof setTimeout>;
	return function (...args: Parameters<F>) {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			fn.apply(this, args);
		}, delay);
	};
};

// format date string to dd-mm-yyyy
export function formatDate(date: string) {
	const dateObj = new Date(parseInt(date));
	const dateNum = dateObj.getDate();
	const month = dateObj.getMonth() + 1;
	const year = dateObj.getFullYear();
	return `${dateNum}-${month}-${year}`;
}
