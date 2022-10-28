const queryParams = document.location.search;
const urlParams = new URLSearchParams(queryParams);
const albumId = urlParams.get('album_id');

const albumWrapper = document.querySelector('#album-wrapper');

fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}?_embed=photos&_expand=user`)
  .then(res => res.json())
  .then(album => {
    let { title, user, photos } = album;

    const albumTitle = document.createElement('h1');
    albumTitle.classList.add('album-title', 'page-title');
    albumTitle.textContent = title;

    const albumAuthor = document.createElement('span');
    albumAuthor.classList.add('album-author');
    albumAuthor.innerHTML = `<strong>Album author:</strong> <a href="./user.html?user_id=${user.id}">${user.name}</a>`;

    const photosList = document.createElement('div');
    photosList.classList.add('photos-list');

    albumWrapper.append(albumTitle, albumAuthor, photosList);

    photos.map(photo => {
      const photoItem = document.createElement('img');
      photoItem.src = photo.thumbnailUrl;
      photoItem.alt = photo.title;

      photosList.append(photoItem);
    })
  })