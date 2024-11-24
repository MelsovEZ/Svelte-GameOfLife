<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { createGrid, nextGeneration } from '$lib/gameLogic';

	let rows = 30;
	let cols = 30;
	let grid = createGrid(rows, cols);
	let intervalId: number | null = null;
	let isRunning = false;

	const toggleCell = (row: number, col: number) => {
		if (!isRunning) {
			grid[row][col] = !grid[row][col];
			grid = grid; // Trigger reactivity
		}
	};

	const startGame = () => {
		if (!isRunning) {
			isRunning = true;
			intervalId = setInterval(() => {
				grid = nextGeneration(grid);
			}, 200);
		}
	};

	const stopGame = () => {
		if (isRunning && intervalId) {
			clearInterval(intervalId);
			intervalId = null;
			isRunning = false;
		}
	};

	const clearGrid = () => {
		if (!isRunning) {
			grid = createGrid(rows, cols);
		}
	};

	const randomizeGrid = () => {
		if (!isRunning) {
			grid = createGrid(rows, cols).map((row) => row.map(() => Math.random() < 0.3));
		}
	};

	onDestroy(() => {
		if (intervalId) {
			clearInterval(intervalId);
		}
	});
</script>

<div class="container mx-auto flex flex-col items-center p-4">
	<div class="grid gap-1" style="grid-template-columns: repeat({cols}, minmax(0, 1fr))">
		{#each grid as row, rowIndex}
			{#each row as cell, colIndex}
				<button
					type="button"
					class={`h-4 w-4 border ${cell ? 'bg-green-500' : 'bg-gray-200'}`}
					on:click={() => toggleCell(rowIndex, colIndex)}
					aria-label={`Toggle cell at row ${rowIndex + 1}, column ${colIndex + 1}`}
				></button>
			{/each}
		{/each}
	</div>

	<div class="mt-4 space-x-2">
		<button
			on:click={startGame}
			disabled={isRunning}
			class="rounded bg-blue-500 px-4 py-2 text-white disabled:opacity-50"
		>
			Start
		</button>
		<button
			on:click={stopGame}
			disabled={!isRunning}
			class="rounded bg-red-500 px-4 py-2 text-white disabled:opacity-50"
		>
			Stop
		</button>
		<button
			on:click={clearGrid}
			disabled={isRunning}
			class="rounded bg-gray-500 px-4 py-2 text-white disabled:opacity-50"
		>
			Clear
		</button>
		<button
			on:click={randomizeGrid}
			disabled={isRunning}
			class="rounded bg-purple-500 px-4 py-2 text-white disabled:opacity-50"
		>
			Randomize
		</button>
	</div>
</div>
