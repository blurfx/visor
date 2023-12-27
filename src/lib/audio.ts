let _audioContext: AudioContext | null = null;
let _gainNode: GainNode | null = null;
function getAudioContext() {
	if (_audioContext == null || _gainNode == null) {
		_audioContext = new AudioContext();
		_gainNode = _audioContext.createGain();
		_gainNode.gain.value = 0.05; // reduce volume by half.
		_gainNode.connect(_audioContext.destination);
	}

	const oscillator = _audioContext.createOscillator();
	oscillator.connect(_gainNode); // Connect Oscillator to Gain Node instead of directly to destination

	return { audioContext: _audioContext, gainNode: _gainNode, oscillator };
}

export function playSound(index: number, arrayLength: number) {
	const { audioContext, oscillator } = getAudioContext();

	// Linear interpolation formula to map index to desired frequency range
	const frequency = (index - 1) * ((1212 - 120) / (arrayLength - 1)) + 120;

	if (Number.isNaN(frequency)) {
		console.log(index, arrayLength);
		debugger;
	}
	console.log(frequency);
	oscillator.frequency.value = frequency;
	oscillator.start();
	oscillator.stop(audioContext.currentTime + 0.05);
}
