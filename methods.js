fetch('https://jsonplaceholder.typicode.com/posts/?_expand=user', {
  method: 'POST',
  body: JSON.stringify({
    title: 'Pavadinimas',
    body: 'posto body',
    userId: 4,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
    console.log(data.body)
    console.log(data.title)
    console.log(data.userId)
    console.log(data.id)
  });