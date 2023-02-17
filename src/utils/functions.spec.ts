import { expect, it, describe } from 'vitest';
import { formatDate, getDateDayAndMonth } from './functions';

describe('formatDate', () => {
	it('should format date to dd-mm-yyyy', () => {
		expect(formatDate('1676519207094')).toBe('16-2-2023');
	});
});

describe('getDateDayAndMonth', () => {
	it('should return date, month and day in an obj', () => {
		const today = new Date();
		expect(getDateDayAndMonth(Date.now().toString())).toEqual({
			date: today.getDate(),
			month: today.toLocaleString('default', { month: 'short' }),
			day: today.toLocaleString('default', { weekday: 'short' })
		});
	});
});
