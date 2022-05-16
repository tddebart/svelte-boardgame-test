import { INVALID_MOVE } from "boardgame.io/core";
import type { Game } from "boardgame.io";

export const width = 3;
export const height = 3;

export interface TicTacToeState {
  cells: (null | string)[];
}

export const TicTacToe: Game<TicTacToeState> = {
  setup: () => ({ cells: Array(width*height).fill(null) }),
  
  turn: {
    minMoves: 1,
    maxMoves: 1,
  },
  
  moves: {
    clickCell: function(G, ctx, id: number) {
      if (G.cells[id] !== null) {
        return INVALID_MOVE;
      }

      G.cells[id] = ctx.currentPlayer;
    }
  },
  
  endIf: (G, ctx) => {
    if(IsVictory(G.cells)) {
      return { winner: ctx.currentPlayer };
    }
    if(IsDraw(G.cells)) {
      return { draw: true };
    }
  },
  
  ai: {
    enumerate: (G, ctx) => {
      let moves = [];
      for (let i = 0; i < width*height; i++) {
        if (G.cells[i] === null) {
          moves.push({ move: 'clickCell', args: [i] });
        }
      }
      return moves;
    },
  },
}

function IsVictory(cells: (null | string)[]) {
 
  // check horizontal
  for(let i = 0; i < height; i++) {
    let row = cells.slice(i*width, i*width + width);
    if(row.every(c => c === row[0] && c !== null)) {
      return true;
    }
  }

  // check vertical
  for(let i = 0; i < width; i++) {
    let col = cells.filter((_, idx) => idx % width === i);
    if(col.every(c => c === col[0] && c !== null)) {
      return true;
    }
  }

  // check diagonal
  let diag1 = cells.filter((_, idx) => idx % (width + 1) === 0);
  if(diag1.every(c => c === diag1[0] && c !== null)) {
    return true;
  }

  let diag2 = cells.filter((_, idx) => idx % (width - 1) === 0).slice(1,width+1);
  if(diag2.every(c => c === diag2[0] && c !== null)) {
    return true;
  }

  return false;
}

function IsDraw(cells: (null | string)[]) {
  return cells.every(c => c !== null);
}

