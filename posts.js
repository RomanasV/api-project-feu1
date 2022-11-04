import { createLinksList, fetchData, getUrlParam, createElement } from "./functions.js";
import renderHeader from "./header.js";

async function init() {
  const userId = getUrlParam('user_id');

  let fetchUrl = '';
  if (userId) {
    fetchUrl = `https://jsonplaceholder.typicode.com/users/${userId}/posts`;
  } else {
    fetchUrl = 'https://jsonplaceholder.typicode.com/posts';
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

  postsWrapper.append(pageTitle, postsListElement);
  
  renderHeader();
}

init();