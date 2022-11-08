import { createElement } from "./functions.js";

export default function renderPaginationLinks(page) {
  const total = 100;
  const limit = 25;
  const pages = Math.ceil(total / limit);
  const currentPage = Number(page);

  const paginationWrapper = createElement('div', '', 'pagination-wrapper');

  if (currentPage === 1) {
    const firstPaginationElement = createElement('span', 'First Page', 'pagination-link current-pagination-link first-pagination-link');
    paginationWrapper.append(firstPaginationElement);
  } else {
    const firstPaginationLink = createElement('a', 'First Page', 'pagination-link first-pagination-link');
    firstPaginationLink.href = './posts.html?page=1';
    paginationWrapper.append(firstPaginationLink);
  }

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

  if (currentPage === pages) {
    const lastPaginationElement = createElement('span', 'Last Page', 'pagination-link last-pagination-link current-page-link');
    paginationWrapper.append(lastPaginationElement);
  } else {
    const lastPaginationLink = createElement('a', 'Last Page', 'pagination-link last-pagination-link');
    lastPaginationLink.href = './posts.html?page=' + pages;
    paginationWrapper.append(lastPaginationLink);
  }

  return paginationWrapper;
}