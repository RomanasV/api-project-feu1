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
      // if (posts.length > 0) {
      //   const postsWrapper = document.createElement('div');
      //   postsWrapper.classList.add('posts-wrapper', 'search-result-wrapper');
      //   searchResults.append(postsWrapper);

      //   const postsWrapperTitle = document.createElement('h2');
      //   postsWrapperTitle.classList.add('search-wrapper-title');
      //   postsWrapperTitle.textContent = 'Posts:';

      //   const postsList = document.createElement('ul');
      //   postsList.classList.add('search-list');

      //   postsWrapper.append(postsWrapperTitle, postsList);

      //   posts.map(post => {
      //     const postItem = document.createElement('li');
      //     postItem.classList.add('search-item');
  
      //     const postLink = document.createElement('a');
      //     postLink.textContent = post.title;
      //     postLink.href = './post.html?post_id=' + post.id;
  
      //     postItem.append(postLink);
      //     postsList.append(postItem);
      //   })
      // } else {
      //   console.log('No users...')
      // }

      const params = {
        data: posts,
        parentElement: searchResults,
        title: 'Posts:',
        path: 'post',
      }

      renderSearchResults(params);
    })

  fetch(`https://jsonplaceholder.typicode.com/albums?q=${search}`)
    .then(res => res.json())
    .then(albums => {
      const params = {
        data: albums,
        parentElement: searchResults,
        title: 'Albums:',
        path: 'album',
      };

      renderSearchResults(params);
    })
}

function renderSearchResults(paramsObj) {
  let { data, parentElement, title, path } = paramsObj;

  if (data.length > 0) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('search-result-wrapper');
    parentElement.append(wrapper);

    const wrapperTitle = document.createElement('h2');
    wrapperTitle.classList.add('search-wrapper-title');
    wrapperTitle.textContent = title;

    const list = document.createElement('ul');
    list.classList.add('search-list');

    wrapper.append(wrapperTitle, list);

    data.map(item => {
      const itemElement = document.createElement('li');
      itemElement.classList.add('search-list-item');

      const linkElement = document.createElement('a');
      linkElement.textContent = item.title;
      linkElement.href = `./${path}.html?${path}_id=${item.id}`;

      itemElement.append(linkElement);
      list.append(itemElement);
    })
  } else {
    console.log('No albums...')
  }
}

init();