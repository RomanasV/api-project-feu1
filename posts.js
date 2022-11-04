import { createLinksList, getUrlParam } from "./functions.js";
import renderHeader from "./header.js";

const userId = getUrlParam('user_id');

let fetchUrl = '';
if (userId) {
  fetchUrl = `https://jsonplaceholder.typicode.com/users/${userId}/posts`;
} else {
  fetchUrl = 'https://jsonplaceholder.typicode.com/posts';
}

fetch(fetchUrl)
  .then(res => res.json())
  .then(posts => {
    const postsWrapper = document.querySelector('#posts-wrapper');

    const pageTitle = document.createElement('h1');
    pageTitle.classList.add('page-title');
    pageTitle.textContent = 'Posts List:';

    const postsListElement = createLinksList({
      data: posts,
      path: 'post',
      listClasses: ['posts-list'],
      itemClasses: ['post-item']
    });

    postsWrapper.append(pageTitle, postsListElement);
  })

renderHeader();