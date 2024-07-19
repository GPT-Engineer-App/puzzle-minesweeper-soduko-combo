import React, { useState } from 'react';
import { cn } from "@/lib/utils";

const Tile = ({ letter, hasMine, row, col, grid }) => {
  const [isShaking, setIsShaking] = useState(false);

  const shouldShake = () => {
    if (letter === 'A') {
      return grid.some(row => row.some(cell => cell.letter === 'A' && cell.hasMine));
    }
    if (letter === 'B') {
      return false;
    }
    if (letter === 'C') {
      const adjacentCells = [
        grid[row-1]?.[col],
        grid[row+1]?.[col],
        grid[row]?.[col-1],
        grid[row]?.[col+1]
      ];
      return adjacentCells.some(cell => cell && cell.letter === 'A');
    }
    return hasMine;
  };

  const handleMouseEnter = () => {
    setIsShaking(shouldShake());
  };

  const handleMouseLeave = () => {
    setIsShaking(false);
  };

  return (
    <div
      className={cn(
        "w-10 h-10 flex items-center justify-center border border-gray-300 text-lg font-bold cursor-pointer",
        isShaking && "animate-shake"
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {letter}
    </div>
  );
};

export default Tile;