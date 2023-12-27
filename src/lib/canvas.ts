let _canvas = null as HTMLCanvasElement | null;
let _ctx = null as CanvasRenderingContext2D | null;
function getCanvasContext() {
	if (_canvas == null || _ctx == null) {
		const canvas = document.getElementById('canvas') as HTMLCanvasElement;
		const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
		_canvas = canvas;
		_ctx = ctx;
	}
	return { canvas: _canvas, ctx: _ctx };
}

type DrawBarProps = {
	array: Array<number>;
	highlight?: (index: number) => boolean;
};
export function drawBar({ array, highlight }: DrawBarProps) {
	const { canvas, ctx } = getCanvasContext();
	const width = canvas.width / array.length;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (let i = 0; i < array.length; i++) {
		ctx.fillStyle = highlight?.(i) ? 'red' : 'black';
		ctx.fillRect(i * width, canvas.height, width, -array[i] * 7);
	}
}
