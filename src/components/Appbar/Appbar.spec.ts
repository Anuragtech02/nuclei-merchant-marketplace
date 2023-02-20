import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Appbar from './Appbar.svelte';

describe('Appbar', () => {
	it('should display title taken through props', () => {
		const { container } = render(Appbar, { title: 'Test Title' });
		const title = container.querySelector('p');
		if (title) {
			expect(title.innerHTML).toBe('Test Title');
		}
	});
});
