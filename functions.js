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

  const list = document.createElement('ul');
  list.classList.add('list-element');

  if (listClasses) {
    listClasses.map(elementClass => {
      list.classList.add(elementClass);
    })
  }

  data.map(item => {
    const itemElement = document.createElement('li');
    itemElement.classList.add('list-item');

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