const GRID_SIZE = 9;
const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const isValid = (grid, row, col, letter) => {
  // Check row
  for (let x = 0; x < GRID_SIZE; x++) {
    if (grid[row][x] === letter) return false;
  }

  // Check column
  for (let x = 0; x < GRID_SIZE; x++) {
    if (grid[x][col] === letter) return false;
  }

  // Check 3x3 sub-grid
  let startRow = row - row % 3;
  let startCol = col - col % 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[i + startRow][j + startCol] === letter) return false;
    }
  }

  return true;
};

const solveSudoku = (grid) => {
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (grid[row][col] === '') {
        for (let letter of shuffleArray(LETTERS)) {
          if (isValid(grid, row, col, letter)) {
            grid[row][col] = letter;
            if (solveSudoku(grid)) {
              return true;
            } else {
              grid[row][col] = '';
            }
          }
        }
        return false;
      }
    }
  }
  return true;
};

export const initializeGrid = () => {
  let grid = Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill(''));
  solveSudoku(grid);

  // Add a single mine randomly
  const mineRow = Math.floor(Math.random() * GRID_SIZE);
  const mineCol = Math.floor(Math.random() * GRID_SIZE);

  return grid.map((row, rowIndex) => 
    row.map((letter, colIndex) => ({
      letter,
      hasMine: rowIndex === mineRow && colIndex === mineCol
    }))
  );
};

export const getColorForLetter = (letter) => {
  const colors = {
    'A': 'bg-red-200',
    'B': 'bg-blue-200',
    'C': 'bg-green-200',
    'D': 'bg-yellow-200',
    'E': 'bg-purple-200',
    'F': 'bg-pink-200',
    'G': 'bg-indigo-200',
    'H': 'bg-orange-200',
    'I': 'bg-teal-200'
  };
  return colors[letter] || 'bg-gray-200';
};