import renderHeader from './header.js';
import { createLinksList, fetchData, firstLetterUpperCase, getUrlParam } from './functions.js';

async function init() {
  const userId = getUrlParam('user_id');

  const userInfo = document.querySelector('.user-info');

  const user = await fetchData('https://jsonplaceholder.typicode.com/users/' + userId);

  let { name, username, email, website, phone, company } = user;
  let { street, suite, city, zipcode } = user.address;

  userInfo.innerHTML = `<h2 class="user-name">${name} (${username})</h2>
                        <ul>
                          <li><strong>Email:</strong> <a href="mailto:${email}">${email}</a></li>
                          <li><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></li>
                          <li><strong>Address:</strong> <a href="#">${street} ${suite}, ${city} (zipcode: ${zipcode})</a></li>
                          <li><strong>Website:</strong> <a href="https://${website}" target="_blank">${website}</a></li>
                          <li><strong>Work:</strong> ${company.name}</li>
                        </ul>`;
  
  fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
    .then(res => res.json())
    .then(posts => {
      const postsWrapper = document.querySelector('#posts-wrapper');
  
      const postsTitle = document.createElement('h3');
      postsTitle.classList.add('posts-title');
      postsTitle.textContent = 'User Posts:';
  
      const postsList = document.createElement('div');
      postsList.classList.add('posts-list');
  
      postsWrapper.append(postsTitle, postsList);
  
      posts.map(post => {
        const postItem = document.createElement('div');
        postItem.classList.add('post-item');
  
        postItem.innerHTML = `<h4>${firstLetterUpperCase(post.title)}</h4>
                              <p>${firstLetterUpperCase(post.body)}</p>
                              <a href="./post.html?post_id=${post.id}">Read more</a>`;
  
        postsList.append(postItem);
      })
    })
  
  fetch(`https://jsonplaceholder.typicode.com/users/${userId}/albums`)
    .then(res => res.json())
    .then(albums => {
      const albumsWrapper = document.querySelector('#albums-wrapper');
  
      const albumsTitle = document.createElement('h3');
      albumsTitle.classList.add('albums-title');
      albumsTitle.textContent = 'User Albums:';
  
      const albumsListElement = createLinksList({
        data: albums,
        path: 'album',
        listClasses: ['albums-list'],
        itemClasses: ['album-item'],
      });
  
      albumsWrapper.append(albumsTitle, albumsListElement);
    })
  
  renderHeader();
}

function createUserInfoElement() {
  
}

init();