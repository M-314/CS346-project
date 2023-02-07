const form = document.querySelector('#image-upload-form');
const imageGrid = document.querySelector('#image-grid');

form.addEventListener('submit', (event) => {
  const file = document.querySelector('#image-file-input').files[0];
  
  const data = new FormData();
  data.append('image',file)
  fetch('http://localhost:5000/api', {
    method: 'post',
    body: data,
  })
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
  
  event.preventDefault();
  const imageItem = document.createElement('div');
  imageItem.classList.add('image-item');
  imageItem.innerHTML = `
    <img src="${URL.createObjectURL(file)}" style = "border-radius:25px">
    <button class="like-button">Like</button>
    <p style = "font-size:large; font-weight:bold;">0 Likes</p>
    <button class="delete-button">Delete</button>
    `;
    
    imageGrid.appendChild(imageItem);
});

imageGrid.addEventListener('click', (event) => {
  if (event.target.classList.contains('like-button')) {
    const imageItem = event.target.parentElement;
    const likeButton = imageItem.querySelector('.like-button');
    const likeCount = parseInt(
      imageItem.querySelector('p').textContent.split(' ')[0]
    );

    likeButton.classList.toggle('liked');
    likeButton.innerHTML = likeButton.classList.contains('liked')
      ? 'Unlike'
      : 'Like';
    imageItem.querySelector('p').textContent = `${
      likeCount + (likeButton.classList.contains('liked') ? 1 : -1)
    } Likes`;
  } else if (event.target.classList.contains('delete-button')) {
    event.target.parentElement.remove();
  }
});

imageGrid.addEventListener('dblclick', (event) => {
  if (event.target.nodeName === 'IMG') {
    const imageItem = event.target.parentElement;
    const likeButton = imageItem.querySelector('.like-button');
    const likeCount = parseInt(
      imageItem.querySelector('p').textContent.split(' ')[0]
    );

    likeButton.classList.toggle('liked');
    likeButton.innerHTML = likeButton.classList.contains('liked')
      ? 'Unlike'
      : 'Like';
    imageItem.querySelector('p').textContent = `${
      likeCount + (likeButton.classList.contains('liked') ? 1 : -1)
    } Likes`;
  }
});
