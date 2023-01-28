import { CITIES } from './constants';

export function getCityByCode(code: string): string | undefined {
	return CITIES.find((city) => city.code === code)?.name;
}

export function getDateDayAndMonth(dateStr: string) {
	const dateObj = new Date(dateStr);
	const date = dateObj.getDate();
	const month = dateObj.toLocaleString('default', { month: 'short' });
	const day = dateObj.toLocaleString('default', { weekday: 'short' });
	return {
		date,
		month,
		day
	};
}
