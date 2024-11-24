export type Cell = boolean;

export const createGrid = (rows: number, cols: number): Cell[][] => {
	return Array.from({ length: rows }, () => Array(cols).fill(false));
};

export const nextGeneration = (grid: Cell[][]): Cell[][] => {
	const rows = grid.length;
	const cols = grid[0].length;
	const newGrid = createGrid(rows, cols);

	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols; c++) {
			const aliveNeighbors = countAliveNeighbors(grid, r, c);
			if (grid[r][c]) {
				newGrid[r][c] = aliveNeighbors === 2 || aliveNeighbors === 3;
			} else {
				newGrid[r][c] = aliveNeighbors === 3;
			}
		}
	}
	return newGrid;
};

const countAliveNeighbors = (grid: Cell[][], row: number, col: number): number => {
	const directions = [
		[-1, -1],
		[-1, 0],
		[-1, 1],
		[0, -1],
		[0, 1],
		[1, -1],
		[1, 0],
		[1, 1]
	];
	return directions.reduce((count, [dx, dy]) => {
		const newRow = row + dx;
		const newCol = col + dy;
		return (
			count +
			(newRow >= 0 &&
			newRow < grid.length &&
			newCol >= 0 &&
			newCol < grid[0].length &&
			grid[newRow][newCol]
				? 1
				: 0)
		);
	}, 0);
};
