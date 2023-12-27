import { drawBar } from '$lib/canvas';
import { onCompare, onComplete, onSwap } from '$lib/sort-events';

export async function bubbleSort(array: Array<number>) {
	const length = array.length;

	for (let i = 0; i < length; i++) {
		for (let j = 0; j < length - i - 1; j++) {
			drawBar({ array, highlight: (k) => k === j || k === j + 1 });
			await onCompare();
			await onSwap(array[j], length);
			await onSwap(array[j + 1], length);
			if (array[j] > array[j + 1]) {
				// swap
				const temp = array[j];
				array[j] = array[j + 1];
				array[j + 1] = temp;
			}
		}
	}
	await onComplete(array);
}
