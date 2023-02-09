const signInForm = document.querySelector('#signin-form');
const signUpForm = document.querySelector('#signup-form');

signUpForm.addEventListener('submit', (event) => {
  event.preventDefault();

  formData = new FormData(signUpForm).entries();

  fetch('http://localhost:5000/users', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(Object.fromEntries(formData)),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
});

signInForm.addEventListener('submit', (event) => {
  event.preventDefault();

  formData = new FormData(signInForm).entries();

  fetch('http://localhost:5000/users/login', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(Object.fromEntries(formData)),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
});
