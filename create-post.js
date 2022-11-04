import { fetchData, createElement } from './functions.js';

function init() {
  const createPostForm = document.querySelector('#create-post-form');
  const usersSelectElement = createPostForm.querySelector('#author');
  const newPostReviewElement = document.querySelector('#new-post-review');

  createAuthorOptionElements(usersSelectElement);

  createPostForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const title = event.target.elements.title.value;
    const body = event.target.elements.body.value;
    const userId = event.target.elements.author.value;

    const newPostObj = {
      title,
      body,
      userId
    };

    const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify(newPostObj),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })

    const newPost = await res.json()
    const newPostElement = await createNewPostElement(newPost);

    newPostReviewElement.innerHTML = '';
    newPostReviewElement.append(newPostElement);

    event.target.reset();
  })
}

async function createAuthorOptionElements(selectElement) {
  const users = await fetchData('https://jsonplaceholder.typicode.com/users');
  
  users.map(user => {
    const optionElement = createElement('option', user.name);
    optionElement.value = user.id;

    selectElement.append(optionElement);
  })
}

async function createNewPostElement(post) {
  const user = await fetchData(`https://jsonplaceholder.typicode.com/users/${post.userId}`);
  const newPostElement = createElement('div', '', 'new-post');
  newPostElement.innerHTML = `<h2 class="post-title">${post.title} (id: ${post.id})</h2>
                              <span>Author: ${user.name}</span>
                              <p>${post.body}</p>`;
  return newPostElement;
}

init();