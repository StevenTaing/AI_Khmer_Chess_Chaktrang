import { $ } from '../services/utilities.js';

export const chessBoard = (selector: string) => {
  const element: Element | null = $(selector);
  for (let row = 8; row >= 1; row--) {
    for (let column = 1; column <= 8; column++) {
      const cell = document.createElement('div');

      // Optional
      cell.setAttribute(
        'cell-text',
        //Checking other characters in Microsoft Excel using formula =UNICODE("TEXT")
        String.fromCharCode(64 + column) + row
      );

      cell.setAttribute('id', `c${row}_${column}`);

      cell.classList.add('cell');

      if (row % 2 === 0) {
        cell.classList.add(column % 2 === 0 ? 'light' : 'dark');
      } else {
        cell.classList.add(column % 2 === 0 ? 'dark' : 'light');
      }

      if (element) element.appendChild(cell);
    }
  }
};
