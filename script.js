import renderHeader from './header.js';

async function init() {
  const contentWrapper = document.querySelector('#content-wrapper');

  const postsListELement = await renderPosts();
  const albumsListElement = await renderAlbums();

  contentWrapper.append(postsListELement, albumsListElement);

  renderHeader();
}

async function renderPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=15&_embed=comments&_expand=user');
  const posts = await res.json();

  let postsList = document.createElement('div');
  postsList.id = 'posts-list';

  posts.map(post => {
    let postItem = document.createElement('div');
    postItem.classList.add('post-item');

    let postTitleElement = document.createElement('h2');
    postTitleElement.classList.add('post-title');
    postTitleElement.textContent = post.title;

    let postAuthorElement = document.createElement('span');
    postAuthorElement.classList.add('post-author');
    postAuthorElement.innerHTML = `Author: <a href="./user.html?user_id=${post.user.id}">${post.user.name}</a>`;

    let postContentElement = document.createElement('p');
    postContentElement.classList.add('post-content');
    postContentElement.textContent = post.body;

    let commentsWrapperElement = document.createElement('div');
    commentsWrapperElement.classList.add('comments-wrapper');

    let commentsSectionTitle = document.createElement('h3');
    commentsSectionTitle.classList.add('comments-section-title');
    commentsSectionTitle.textContent = 'Comments:';

    let commentsListElement = document.createElement('div');
    commentsListElement.classList.add('comments-list');
    
    post.comments.map(comment => {
      let commentItem = document.createElement('div');
      commentItem.classList.add('comment-item');

      commentItem.innerHTML = `<h4 class="comment-title">${comment.name}</h4>
                              <span class="comment-author">Commented by: ${comment.email}</span>
                              <p class="comment-content">${comment.body}</p>`;

      commentsListElement.append(commentItem);
    })

    commentsWrapperElement.append(commentsSectionTitle, commentsListElement);

    postItem.append(postTitleElement, postAuthorElement, postContentElement, commentsWrapperElement);
    postsList.append(postItem);
  })

  return postsList;
}

async function renderAlbums() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/albums?_limit=15&_embed=photos&_expand=user`);
  const albums = await res.json();

  let albumsList = document.createElement('div');
  albumsList.id = 'albums-list';

  albums.map(album => {
    let albumItem = document.createElement('div');
    albumItem.classList.add('album-item');
    albumsList.append(albumItem);

    albumItem.innerHTML = `<h3 class="album-title"><a href="./album.html?album_id=${album.id}">${album.title}</a></h3>
                          <div class="album-author">Album created by: ${album.user.name}</div>
                          <img src="${album.photos[0].thumbnailUrl}" alt="${album.photos[0].title}">`;
  })

  return albumsList;
}

init();