function init() {
  const queryParams = document.location.search;
  const urlParams = new URLSearchParams(queryParams);
  const search = urlParams.get('search');
  
  const searchResults = document.querySelector('#search-results');
  const searchPageTitle = document.createElement('h1');
  searchPageTitle.classList.add('page-title', 'search-page-title');
  searchPageTitle.textContent = `Results, search phrase: ${search}`;

  searchResults.append(searchPageTitle);
  
  fetch(`https://jsonplaceholder.typicode.com/users?q=${search}`)
    .then(res => res.json())
    .then(users => {
      const formattedUsers = users.map(user => {
        const formattedUser = {
          id: user.id,
          title: user.name,
        }

        return formattedUser;
      });

      renderSearchResults({
        data: formattedUsers,
        parentElement: searchResults,
        title: 'Users:',
        path: 'user',
      });
    })

  fetch(`https://jsonplaceholder.typicode.com/posts?q=${search}`)
    .then(res => res.json())
    .then(posts => {
      renderSearchResults({
        data: posts,
        parentElement: searchResults,
        title: 'Posts:',
        path: 'post',
      });
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