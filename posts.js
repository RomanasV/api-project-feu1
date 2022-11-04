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
    
    postsWrapper.append(pageTitle);

    createLinksList({
      wrapper: postsWrapper, 
      data: posts,
      path: 'post',
      listClasses: ['posts-list'],
      itemClasses: ['post-item']
    });
  })

renderHeader();