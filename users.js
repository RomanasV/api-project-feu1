import renderHeader from './header.js';

fetch('https://jsonplaceholder.typicode.com/users?_embed=posts')
  .then(res => res.json())
  .then(users => {
    const usersWrapper = document.querySelector('#users-wrapper');

    const pageTitle = document.createElement('h1');
    pageTitle.classList.add('page-title');
    pageTitle.textContent = 'Users list:';

    const usersList = document.createElement('ul');
    usersList.classList.add('users-list');

    usersWrapper.append(pageTitle, usersList);

    users.map(user => {
      const userItem = document.createElement('li');
      userItem.classList.add('user-item');
      userItem.innerHTML = `<a href="./user.html?user_id=${user.id}">${user.name} (${user.posts.length})</a>`;

      usersList.append(userItem);
    })
  })

renderHeader();