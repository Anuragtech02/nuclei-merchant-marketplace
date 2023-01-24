import { CITIES } from './constants';

export function getCityByCode(code: string): string | undefined {
	return CITIES.find((city) => city.code === code)?.name;
}
