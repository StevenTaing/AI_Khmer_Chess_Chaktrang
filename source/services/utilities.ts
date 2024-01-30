export const $ = (query: string) => document.querySelector(query);
export const $$ = (query: string) => [...document.querySelectorAll(query)];
export const $$$ = (element: Element, attribute: string) =>
  element.getAttribute(attribute);
