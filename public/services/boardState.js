import { $$, $$$ } from './utilities.js';
import { chessConfig } from '../configurations/chessConfig.js';
export const boardStates = () => {
    let states = [];
    $$(chessConfig.cellSelector).forEach((element) => {
        states.push({
            cell: $$$(element, 'id'),
            player: $$$(element, 'player'),
            piece: $$$(element, 'piece'),
        });
    });
    return states;
};
