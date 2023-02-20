import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Counter from './Counter.svelte';

describe('Counter', () => {
	it('displays the counter component with initial values', () => {
		const counterProps = {
			count: 1,
			min: 1,
			max: 10,
			maxDisabled: false
		};
		const { container } = render(Counter, counterProps);
		const input = container.querySelector('input');
		const decrementButton = container.querySelectorAll('button')[0];
		const incrementButton = container.querySelectorAll('button')[1];
		if (input) {
			expect(input.value).toBe(counterProps.count.toString());
		}
		if (decrementButton) {
			expect(decrementButton.innerHTML).toBe('-');
			expect(decrementButton.disabled).toBe(counterProps.count === counterProps.min);
		}
		if (incrementButton) {
			expect(incrementButton.innerHTML).toBe('+');
			expect(incrementButton.disabled).toBe(
				counterProps.maxDisabled || counterProps.count === counterProps.max
			);
		}
	});

	it('should increment the counter', async () => {
		const counterProps = {
			count: 1,
			min: 1,
			max: 10,
			maxDisabled: false
		};
		const { container } = render(Counter, counterProps);
		const input = container.querySelector('input');
		const incrementButton = container.querySelectorAll('button')[1];
		if (input && incrementButton) {
			await incrementButton.click();
			expect(input.value).toBe((counterProps.count + 1).toString());
		}
	});

	it('should decrement the counter', async () => {
		const counterProps = {
			count: 2,
			min: 1,
			max: 10,
			maxDisabled: false
		};
		const { container } = render(Counter, counterProps);
		const input = container.querySelector('input');
		const decrementButton = container.querySelectorAll('button')[0];
		if (input && decrementButton) {
			await decrementButton.click();
			expect(input.value).toBe((counterProps.count - 1).toString());
		}
	});

	it('should not decrement the counter if count is equal to min', async () => {
		const counterProps = {
			count: 1,
			min: 1,
			max: 10,
			maxDisabled: false
		};
		const { container } = render(Counter, counterProps);
		const input = container.querySelector('input');
		const decrementButton = container.querySelectorAll('button')[0];
		if (input && decrementButton) {
			await decrementButton.click();
			expect(input.value).toBe(counterProps.count.toString());
		}
	});

	it('should not increment the counter if count is equal to max', async () => {
		const counterProps = {
			count: 10,
			min: 1,
			max: 10,
			maxDisabled: false
		};
		const { container } = render(Counter, counterProps);
		const input = container.querySelector('input');
		const incrementButton = container.querySelectorAll('button')[1];
		if (input && incrementButton) {
			await incrementButton.click();
			expect(input.value).toBe(counterProps.count.toString());
		}
	});

	it('should not increment the counter if maxDisabled is true', async () => {
		const counterProps = {
			count: 9,
			min: 1,
			max: 10,
			maxDisabled: true
		};
		const { container } = render(Counter, counterProps);
		const input = container.querySelector('input');
		const incrementButton = container.querySelectorAll('button')[1];
		if (input && incrementButton) {
			await incrementButton.click();
			expect(input.value).toBe(counterProps.count.toString());
		}
	});
});
