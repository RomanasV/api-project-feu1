function init() {
  const queryParams = document.location.search;
  const urlParams = new URLSearchParams(queryParams);
  const search = urlParams.get('search');
  
  const searchResults = document.querySelector('#search-results');
  const searchPageTitle = document.createElement('h1');
  searchPageTitle.classList.add('page-title', 'search-page-title');
  searchPageTitle.textContent = `Results, search phrase: ${search}`;

  searchResults.append(searchPageTitle);
  console.log(search);
  
  fetch(`https://jsonplaceholder.typicode.com/users?q=${search}`)
    .then(res => res.json())
    .then(users => {
      if (users.length > 0) {
        const usersWrapper = document.createElement('div');
        usersWrapper.classList.add('users-wrapper', 'search-result-wrapper');
        searchResults.append(usersWrapper);

        const usersWrapperTitle = document.createElement('h2');
        usersWrapperTitle.classList.add('search-wrapper-title');
        usersWrapperTitle.textContent = 'Users:';

        const usersList = document.createElement('ul');
        usersList.classList.add('search-list');

        usersWrapper.append(usersWrapperTitle, usersList);

        users.map(user => {
          const userItem = document.createElement('li');
          userItem.classList.add('search-item');          

          const userLink = document.createElement('a');
          userLink.textContent = user.name;
          userLink.href = './user.html?user_id=' + user.id;

          userItem.append(userLink);
          usersList.append(userItem);
        })
      } else {
        console.log('No users...');
      }
    })

  fetch(`https://jsonplaceholder.typicode.com/posts?q=${search}`)
    .then(res => res.json())
    .then(posts => {
      if (posts.length > 0) {
        const postsWrapper = document.createElement('div');
        postsWrapper.classList.add('posts-wrapper', 'search-result-wrapper');
        searchResults.append(postsWrapper);

        const postsWrapperTitle = document.createElement('h2');
        postsWrapperTitle.classList.add('search-wrapper-title');
        postsWrapperTitle.textContent = 'Posts:';

        const postsList = document.createElement('ul');
        postsList.classList.add('search-list');

        postsWrapper.append(postsWrapperTitle, postsList);

        posts.map(post => {
          const postItem = document.createElement('li');
          postItem.classList.add('search-item');
  
          const postLink = document.createElement('a');
          postLink.textContent = post.title;
          postLink.href = './post.html?post_id=' + post.id;
  
          postItem.append(postLink);
          postsList.append(postItem);
        })
      } else {
        console.log('No users...')
      }
    })

  fetch(`https://jsonplaceholder.typicode.com/albums?q=${search}`)
    .then(res => res.json())
    .then(albums => {
      if (albums.length > 0) {
        const albumsWrapper = document.createElement('div');
        albumsWrapper.classList.add('albums-wrapper', 'search-result-wrapper');
        searchResults.append(albumsWrapper);

        const albumsWrapperTitle = document.createElement('h2');
        albumsWrapperTitle.classList.add('search-wrapper-title');
        albumsWrapperTitle.textContent = 'Albums:';

        const albumsList = document.createElement('ul');
        albumsList.classList.add('search-list');

        albumsWrapper.append(albumsWrapperTitle, albumsList);

        albums.map(album => {
          const albumItem = document.createElement('li');
          albumItem.classList.add('album-item');
  
          const albumLink = document.createElement('a');
          albumLink.textContent = album.title;
          albumLink.href = './album.html?album_id=' + album.id;

          albumItem.append(albumLink);
          albumsList.append(albumItem);
        })
      } else {
        console.log('No albums...')
      }
    })
}

init();