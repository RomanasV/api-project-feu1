const userId = 1;
const userInfo = document.querySelector('.user-info');

fetch('https://jsonplaceholder.typicode.com/users/' + userId)
  .then(res => res.json())
  .then(user => {
    console.log(user);
    console.log(user.name);
    console.log(user.nickname);
    console.log(user.email);
    console.log(user.website);
    console.log(user.phone);
    console.log(user.address);
    console.log(user.company);
    console.log(user.company.name);
  })
