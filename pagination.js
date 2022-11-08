import { createElement } from "./functions.js";

export default function renderPaginationLinks(page) {
  const total = 100;
  const limit = 25;
  const pages = Math.ceil(total / limit);
  const currentPage = Number(page);

  const paginationWrapper = createElement('div', '', 'pagination-wrapper');

  const firstPaginationElement = createSinglePaginationElement(currentPage, 1, 'First Page', 'first-pagination-link');
  paginationWrapper.append(firstPaginationElement);

  for (let i = 1; i <= pages; i++) {
    const paginationElement = createSinglePaginationElement(currentPage, i, i);
    paginationWrapper.append(paginationElement);
  }

  const lastPaginationElement = createSinglePaginationElement(currentPage, pages, 'Last Page', 'last-pagination-link');

  paginationWrapper.append(lastPaginationElement);
  return paginationWrapper;
}

function createSinglePaginationElement(currentPage, page, text, className) {
  if (!currentPage || !page || !text) {
    return '';
  }

  const pathName = document.location.pathname

  let paginationElement;

  if (currentPage === page) {
    paginationElement = createElement('span', text, 'pagination-link current-page-link');
  } else {
    paginationElement = createElement('a', text, 'pagination-link');
    paginationElement.href = `.${pathName}?page=${page}`;
  }

  if (className) {
    paginationElement.classList.add(className);
  }

  return paginationElement;
}