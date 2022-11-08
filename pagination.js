import { createElement } from "./functions.js";

export default function renderPaginationLinks(page) {
  const total = 100;
  const limit = 25;
  const pages = Math.ceil(total / limit);
  const currentPage = Number(page);

  const paginationWrapper = createElement('div', '', 'pagination-wrapper');

  for (let i = 1; i <= pages; i++) {
    if (currentPage === i) {
      const paginationElement = createElement('span', i, 'pagination-link current-page-link');
      paginationWrapper.append(paginationElement);
    } else {
      const paginationLink = createElement('a', i, 'pagination-link');
      paginationLink.href = './posts.html?page=' + i;
      paginationWrapper.append(paginationLink);
    }
  }

  return paginationWrapper;
}