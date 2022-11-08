import { createElement } from "./functions.js";

export default function renderPaginationLinks(page) {
  const total = 100;
  const limit = 25;
  const pages = Math.ceil(total / limit);
  const currentPage = Number(page);

  const paginationWrapper = createElement('div', '', 'pagination-wrapper');

  const firstPaginationElement = createSinglePaginationElement({
    currentPage, 
    page: 1,
    className: 'first-pagination-link',
    text: 'First Page', 
    pageLink: 1,
  });

  const previousPaginationElement = createSinglePaginationElement({
    currentPage, 
    page: 1,
    className: 'previous-pagination-link',
    text: 'Previous', 
    pageLink: currentPage - 1,
  });

  paginationWrapper.append(firstPaginationElement, previousPaginationElement);

  for (let i = 1; i <= pages; i++) {
    const paginationElement = createSinglePaginationElement({
      currentPage, 
      page: i,
      text: i, 
      pageLink: i,
    });
    paginationWrapper.append(paginationElement);
  }

  const nextPaginationElement = createSinglePaginationElement({
    currentPage, 
    page: pages,
    className: 'next-pagination-link',
    text: 'Next', 
    pageLink: currentPage + 1,
  });

  const lastPaginationElement = createSinglePaginationElement({
    currentPage, 
    page: pages,
    className: 'last-pagination-link',
    text: 'Last Page', 
    pageLink: pages,
  });

  paginationWrapper.append(nextPaginationElement, lastPaginationElement);
  return paginationWrapper;
}

function createSinglePaginationElement(data) {
  let { currentPage, page, text, className, pageLink } = data;

  if (!currentPage || !page || !text || !pageLink) {
    return '';
  }

  const pathName = document.location.pathname

  let paginationElement;

  if (currentPage === page) {
    paginationElement = createElement('span', text, 'pagination-link current-page-link');
  } else {
    paginationElement = createElement('a', text, 'pagination-link');
    paginationElement.href = `.${pathName}?page=${pageLink}`;
  }

  if (className) {
    paginationElement.classList.add(className);
  }

  return paginationElement;
}