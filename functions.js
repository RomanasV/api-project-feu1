export function firstLetterUpperCase(text) {
  return text[0].toUpperCase() + text.slice(1);
}

export function getUrlParam(searchText) {
  const queryParams = document.location.search;
  const urlParams = new URLSearchParams(queryParams);
  const result = urlParams.get(searchText);
  return result;
}

export function createLinksList(paramsObj) {
  let { data, path, listClasses, itemClasses } = paramsObj;

  const list = createElement('ul', '', 'list-element');

  if (listClasses) {
    listClasses.map(elementClass => {
      list.classList.add(elementClass);
    })
  }

  data.map(item => {
    const itemElement = createElement('li', '', 'list-item');

    if (itemClasses) {
      itemClasses.map(itemClass => {
        itemElement.classList.add(itemClass);
      })
    }

    const linkElement = document.createElement('a');
    linkElement.textContent = firstLetterUpperCase(item.title);
    linkElement.href = `./${path}.html?${path}_id=${item.id}`;

    itemElement.append(linkElement);
    list.append(itemElement);
  })

  return list;
}

export function renderSinglePost(post) {
  const postTitleElement = createElement('h2', firstLetterUpperCase(post.title), 'post-title');

  const postAuthorElement = createElement('span', '', 'post-author');
  postAuthorElement.innerHTML = `Author: <a href="./user.html?user_id=${post.user.id}">${post.user.name}</a>`;

  const postContentElement = createElement('p', firstLetterUpperCase(post.body), 'post-content');

  const postContent = createElement('div', '', 'post-content');

  postContent.append(postTitleElement, postAuthorElement, postContentElement);

  return postContent;
}

export function renderAllComments(post) {
  const commentsWrapperElement = createElement('div', '', 'comments-wrapper');
  const commentsSectionTitle = createElement('h3', 'Comments:', 'comments-section-title');
  const commentsListElement = createElement('div', '', 'comments-list');
  
  post.comments.map(comment => {
    const commentItem = createElement('div', '', 'comment-item');

    commentItem.innerHTML = `<h4 class="comment-title">${firstLetterUpperCase(comment.name)}</h4>
                              <span class="comment-author">Comment's author: ${comment.email}</span>
                              <p class="comment-content">${firstLetterUpperCase(comment.body)}</p>`;

    commentsListElement.append(commentItem);
  })

  commentsWrapperElement.append(commentsSectionTitle, commentsListElement);

  return commentsWrapperElement;
}

export async function fetchData(url) {
  const res = await fetch(url);
  const result = await res.json();
  return result;
}

export function createElement(tag, content, className = '') {
  if (!tag) return;

  const element = document.createElement(tag);
  element.textContent = content;

  if (className) {
    element.className = className;
  }
  return element;
}