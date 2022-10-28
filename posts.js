fetch('https://jsonplaceholder.typicode.com/posts')
  .then(res => res.json())
  .then(posts => {
    const postsWrapper = document.querySelector('#posts-wrapper');

    const pageTitle = document.createElement('h1');
    pageTitle.classList.add('page-title');
    pageTitle.textContent = 'Posts List:';

    const postsList = document.createElement('ul');
    postsList.classList.add('posts-list');

    postsWrapper.append(pageTitle, postsList);

    posts.map(post => {
      const postItem = document.createElement('li');
      postItem.classList.add('post-item');
      postItem.innerHTML = `<a href="./post.html?post_id=${post.id}">${post.title}</a>`;
      postsList.append(postItem);
    })
  })