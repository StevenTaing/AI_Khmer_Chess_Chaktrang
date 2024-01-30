import { $, $$ } from './utilities.js';
export const addSelection = (selections) => {
    for (var i = 0; i < selections.length; i++) {
        $(`#${selections[i]}`)?.classList.add('cell-selected');
    }
};
export const clearSection = () => {
    $$('.cell-selected').forEach((selectedCell) => {
        selectedCell.classList.remove('cell-selected');
    });
};
