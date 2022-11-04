import { createLinksList } from './functions.js';
import renderHeader from './header.js';

fetch('https://jsonplaceholder.typicode.com/users?_embed=posts')
  .then(res => res.json())
  .then(users => {
    const usersWrapper = document.querySelector('#users-wrapper');

    const pageTitle = document.createElement('h1');
    pageTitle.classList.add('page-title');
    pageTitle.textContent = 'Users list:';

    const usersData = users.map(user => {
      let userObj = {
        id: user.id,
        title: `${user.name} (${user.posts.length})`,
      }

      return userObj;
    })

    const usersListElement = createLinksList({
      data: usersData,
      path: 'user',
      listClasses: ['users-list'],
      itemClasses: ['user-item'],
    });


    usersWrapper.append(pageTitle, usersListElement);
  })

renderHeader();