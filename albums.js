import renderHeader from './header.js';

fetch('https://jsonplaceholder.typicode.com/albums?_embed=photos')
  .then(res => res.json())
  .then(albums => {
    const albumsWrapper = document.querySelector('#albums-wrapper');

    const pageTitle = document.createElement('h1');
    pageTitle.classList.add('page-title');
    pageTitle.textContent = 'Albums list:';

    const albumsList = document.createElement('div');
    albumsList.classList.add('albums-list');

    albumsWrapper.append(pageTitle, albumsList);

    albums.map(album => {
      const photosCount = album.photos.length;
      const randomIndex = Math.floor(Math.random() * photosCount);
      const randomPhoto = album.photos[randomIndex];

      const albumItem = document.createElement('div');
      albumItem.classList.add('album-item');

      albumItem.innerHTML = `<a href="./album.html?album_id=${album.id}">
                              <h2 class="album-title">${album.title}</h2>
                              <img src="${randomPhoto.thumbnailUrl}" alt="${randomPhoto.title}">
                             </a>`;

      albumsList.append(albumItem);
    })
    
    renderHeader();
  })