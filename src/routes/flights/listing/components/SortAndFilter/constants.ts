export const SORT_OPTIONS = [
	{
		label: 'Price',
		subTitle: '(Cheapest First)',
		value: 'price_asc'
	},
	{
		label: 'Duration',
		subTitle: '(Shortest First)',
		value: 'duration_asc'
	},
	{
		label: 'Departure',
		subTitle: '(Night First)',
		value: 'departure_desc'
	},
	{
		label: 'Departure',
		subTitle: '(Morning First)',
		value: 'departure_asc'
	}
];

export const STOP_OPTIONS = [
	{
		label: 'Non-Stop',
		count: 0,
		value: 'non_stop'
	},
	{
		label: 'Stop',
		count: 1,
		value: '1'
	},
	{
		label: 'Stops',
		count: 2,
		value: '2+'
	}
];

export const DEPARTURE_TIME_OPTIONS = [
	{
		label: 'Morning',
		time: '12AM - 6AM',
		value: 'morning',
		icon: '/icons/morning.svg'
	},
	{
		label: 'Noon',
		time: '6AM - 12PM',
		value: 'noon',
		icon: '/icons/noon.svg'
	},
	{
		label: 'Evening',
		time: '12PM - 6PM',
		value: 'evening',
		icon: '/icons/evening.svg'
	},
	{
		label: 'Night',
		time: '6PM - 12AM',
		value: 'night',
		icon: '/icons/night.svg'
	}
];

export const MORE_FILTERS_OPTIONS = [
	{
		label: 'Refundable',
		value: 'refundable',
		icon: '/icons/refundable-grey.svg'
	},
	{
		label: 'Hand Baggage Only',
		value: 'hand_baggage',
		icon: '/icons/hand-baggage.svg'
	},
	{
		label: 'Free Meals',
		value: 'free_meals',
		icon: '/icons/meals-grey.svg'
	}
];
