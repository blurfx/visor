import { onCompare, onComplete, onSwap } from '$lib/sort-events';
import { drawBar } from '$lib/canvas';

export async function insertionSort(array: Array<number>) {
	for (let i = 0; i < array.length; i++) {
		const tmp = array[i];
		let j = i - 1;

		await onCompare();

		while (j >= 0 && array[j] > tmp) {
			await onCompare();
			array[j + 1] = array[j];
			await onSwap(array[j], array.length);
			await onSwap(array[j + 1], array.length);
			drawBar({ array, highlight: (k) => k === j || k === j + 1 });
			j--;
		}

		await onSwap(array[i], array.length);
		await onSwap(array[j + 1], array.length);
		drawBar({ array, highlight: (k) => k === i || k === j + 1 });
		array[j + 1] = tmp;
	}
	await onComplete(array);
}
