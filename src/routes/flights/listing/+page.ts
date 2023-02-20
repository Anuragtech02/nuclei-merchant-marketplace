import type { PageLoad } from './$types';
import type { IParams } from './utils';

export const load = (({ url }: any) => {
	const searchParams = new URLSearchParams(url.searchParams);

	const params: IParams = {} as IParams;

	searchParams?.forEach((value: any, key: any) => {
		params[key] = value;
	});

	return {
		params
	};
}) satisfies PageLoad;
