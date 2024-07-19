import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import Tile from './Tile';
import { initializeGrid } from '../utils/gameLogic';

const PuzzleGame = () => {
  const [grid, setGrid] = useState([]);

  useEffect(() => {
    const initialGrid = initializeGrid();
    setGrid(initialGrid);
  }, []);

  return (
    <Card className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Puzzle Game</h1>
      <div className="grid grid-cols-9 gap-1">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Tile
              key={`${rowIndex}-${colIndex}`}
              letter={cell.letter}
              hasMine={cell.hasMine}
              row={rowIndex}
              col={colIndex}
              grid={grid}
            />
          ))
        )}
      </div>
    </Card>
  );
};

export default PuzzleGame;