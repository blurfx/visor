import { onCompare, onComplete, onSwap } from '$lib/sort-events';
import { drawBar } from '$lib/canvas';

export async function quickSort(array: Array<number>) {
	const length = array.length;
	await quickSortHelper(array, 0, length - 1);
	await onComplete(array);
}

async function quickSortHelper(array: Array<number>, start: number, end: number) {
	if (start >= end) {
		return;
	}
	const pivot = await partition(array, start, end);
	await quickSortHelper(array, start, pivot - 1);
	await quickSortHelper(array, pivot + 1, end);
}

async function partition(array: Array<number>, start: number, end: number): Promise<number> {
	const pivot = array[end];
	let i = start - 1;
	for (let j = start; j < end; j++) {
		await onCompare();
		if (array[j] < pivot) {
			i++;
			await onSwap(array[i], array.length);
			await onSwap(array[j], array.length);
			const temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
		drawBar({ array, highlight: (k) => k === j || k === i });
	}
	await onSwap(array[i + 1], array.length);
	await onSwap(array[end], array.length);
	const temp = array[i + 1];
	array[i + 1] = array[end];
	array[end] = temp;
	return i + 1;
}
