<script lang="ts">
  import '../global.css';
  import { bubbleSort } from "$lib/sort-algorithms/bubble";
  import { shuffleArray } from "$lib/shuffle";
  import { quickSort } from "$lib/sort-algorithms/quick";
  import { insertionSort } from "$lib/sort-algorithms/insertion";

  type Algorithm = 'bubble' | 'quick' | 'insertion';

  let currentAlgorithm: Algorithm = 'bubble';


  const algorithms: Record<Algorithm, (array: Array<number>) => void> = {
    bubble: bubbleSort,
    quick: quickSort,
    insertion: insertionSort
  }

  const algorithmName: Record<Algorithm, string> = {
    bubble: 'Bubble Sort',
    quick: 'Quick Sort',
    insertion: 'Insertion Sort'
  }

  function handleStart() {
    const array = shuffleArray(new Array(100).fill(0).map((_, i) => i + 1));
    algorithms[currentAlgorithm](array);
  }

  function handleStop() {
    console.log('stop');
  }

  function handleReset() {
    console.log('reset');
  }
</script>

<svelte:head>
  <title>visor</title>
  <meta name="description" content="visualization of sorting algorithms" />
</svelte:head>

<div id="container">
  <div id="controls">

    <div>
      <select name="algorithm" id="algorithm" bind:value={currentAlgorithm}>
        {#each Object.entries(algorithmName) as [key, name]}
          <option value={key}>{name}</option>
        {/each}
      </select>
      <button on:click={handleStart}>Start</button>
      <button on:click={handleStop}>Stop</button>
    </div>
    <div>
      <button on:click={handleReset}>Reset</button>
    </div>
  </div>
  <canvas id="canvas" width="800" height="800"></canvas>

</div>

<style lang="scss">
  #container {
    display: grid;
    grid-template-rows: 6rem 1fr;
    width: 100%;
    height: 100%;
  }

  #controls {
    display: flex;
    grid-row:  1 / 2;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    background: #333;
    color: white;
  }

  #canvas {
    grid-row: 2 / 2;
    width: 800px;
    height: 800px;

  }
</style>
