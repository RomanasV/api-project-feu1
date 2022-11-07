import renderHeader from './header.js';
import { getUrlParam, renderSinglePost, renderAllComments, fetchData, createElement } from './functions.js';

async function init() {
  const postId = getUrlParam('post_id');
  
  const post = await fetchData(`https://jsonplaceholder.typicode.com/posts/${postId}?_expand=user&_embed=comments`);
  
  const postWrapper = document.querySelector('#post-wrapper');
  const editPostLink = createElement('a', 'Edit Post', 'edit-post-button');
  editPostLink.href = './edit-post.html?post_id=' + postId;
  const postContent = renderSinglePost(post);
  const postComments = renderAllComments(post);
  const otherPosts = renderOtherPostsList(post);

  postWrapper.append(editPostLink, postContent, otherPosts, postComments);

  renderHeader();
}

function renderOtherPostsList(post) {
  let moreAuthorPostsElement = document.createElement('a');
  moreAuthorPostsElement.classList.add('more-posts');
  moreAuthorPostsElement.href = './posts.html?user_id=' + post.user.id;
  moreAuthorPostsElement.textContent = `Other posts of ${post.user.name}`;
  return moreAuthorPostsElement;
}

init();