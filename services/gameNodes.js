import { $$, $$$ } from './utilities.js';
import { chessConfig } from '../configurations/chessConfig.js';

export const gameNodes = () => {
  let node = [];
  $$(chessConfig.cellSelector).forEach((element) => {
    node.push({
      cell: $$$(element, 'id'),
      player: $$$(element, 'player'),
      piece: $$$(element, 'piece'),
    });
  });
  return node;
};
