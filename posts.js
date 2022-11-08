import { createLinksList, fetchData, getUrlParam, createElement } from "./functions.js";
import renderHeader from "./header.js";
import renderPaginationLinks from "./pagination.js";

async function init() {
  const userId = getUrlParam('user_id');
  const limit = getUrlParam('limit') ? getUrlParam('limit') : 10;
  const page = getUrlParam('page') ? getUrlParam('page') : 1;

  let fetchUrl = '';
  if (userId) {
    fetchUrl = `https://jsonplaceholder.typicode.com/users/${userId}/posts`;
  } else {
    fetchUrl = `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`;
  }

  const posts = await fetchData(fetchUrl);
  const postsWrapper = document.querySelector('#posts-wrapper');

  const pageTitle = createElement('h1', 'Posts List:', 'page-title');

  const postsListElement = createLinksList({
    data: posts,
    path: 'post',
    listClasses: ['posts-list'],
    itemClasses: ['post-item']
  });

  const pagination = renderPaginationLinks({page, limit});

  postsWrapper.append(pageTitle, pagination, postsListElement);
  
  renderHeader();
}

init();