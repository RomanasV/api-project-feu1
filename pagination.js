import { createElement } from "./functions.js";

export default function renderPaginationLinks() {
  const total = 100;
  const limit = 25;
  const pages = Math.ceil(total / limit);

  const paginationWrapper = createElement('div', '', 'pagination-wrapper');

  for (let i = 1; i <= pages; i++) {
    const paginationLink = createElement('a', i, 'pagination-link');
    paginationLink.href = './posts.html?page=' + i;
    paginationWrapper.append(paginationLink);
  }

  return paginationWrapper;
}