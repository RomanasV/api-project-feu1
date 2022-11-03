import renderHeader from "./header.js";

const queryParams = document.location.search;
const urlParams = new URLSearchParams(queryParams);
const userId = urlParams.get('user_id');

const userInfo = document.querySelector('.user-info');

fetch('https://jsonplaceholder.typicode.com/users/' + userId)
  .then(res => res.json())
  .then(user => {
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
  })

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

      postItem.innerHTML = `<h4>${post.title}</h4>
                            <p>${post.body}</p>
                            <a href="./post.html">Read more</a>`;

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

    const albumsList = document.createElement('ul');
    albumsList.classList.add('albums-list');

    albumsWrapper.append(albumsTitle, albumsList);

    albums.map(album => {
      const albumItem = document.createElement('li');
      albumItem.classList.add('album-item');

      const albumItemLink = document.createElement('a');
      albumItemLink.textContent = album.title;
      albumItemLink.href = './album.html?album_id=' + album.id;

      albumItem.append(albumItemLink);
      albumsList.append(albumItem);
    })
  })

renderHeader();