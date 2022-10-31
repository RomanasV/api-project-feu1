function init() {
  const queryParams = document.location.search;
  const urlParams = new URLSearchParams(queryParams);
  const search = urlParams.get('search');
  
  console.log(search);
  
  fetch(`https://jsonplaceholder.typicode.com/users?q=${search}`)
    .then(res => res.json())
    .then(users => {
      console.log(users);
      users.map(user => {
        console.log(user);
        console.log(user.name);
        console.log(user.id);

        const userLink = document.createElement('a');
        userLink.textContent = user.name;
        userLink.href = './user.html?user_id=' + user.id;

        console.log(userLink);
      })
    })

  fetch(`https://jsonplaceholder.typicode.com/posts?q=${search}`)
    .then(res => res.json())
    .then(posts => {
      console.log(posts);

      posts.map(post => {
        console.log(post);
        console.log(post.title);
        console.log(post.id);

        let postLink = document.createElement('a');
        postLink.textContent = post.title;
        postLink.href = './post.html?post_id=' + post.id;

        console.log(postLink);
      })
    })

  fetch(`https://jsonplaceholder.typicode.com/albums?q=${search}`)
    .then(res => res.json())
    .then(albums => {
      console.log(albums);

      albums.map(album => {
        console.log(album);

        const albumLink = document.createElement('a');
        albumLink.textContent = album.title;
        albumLink.href = './album.html?album_id=' + album.id;
        console.log(albumLink);
      })
    })
}

init();