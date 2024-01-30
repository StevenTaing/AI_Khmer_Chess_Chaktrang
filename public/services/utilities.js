export const $ = (query) => document.querySelector(query);
export const $$ = (query) => [...document.querySelectorAll(query)];
export const $$$ = (element, attribute) => element.getAttribute(attribute);
