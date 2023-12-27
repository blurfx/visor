import { sleep } from '$lib/sleep';
import { playSound } from '$lib/audio';
import { drawBar } from '$lib/canvas';

export async function onCompare() {
	await sleep(50);
}

export async function onSwap(value: number, totalItems: number) {
	playSound(value, totalItems);
}

export async function onComplete(array: Array<number>) {
	drawBar({ array });
	await sleep(500);

	for (let index = 0; index < array.length; index++) {
		const value = array[index];
		await sleep(10);
		drawBar({ array, highlight: (i) => i <= index });
		playSound(value, array.length);
	}
}
