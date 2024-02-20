import axios from 'axios';
import './css/common.css';

axios.defaults.headers.common['x-api-key'] =
  'live_0XRpC8Po01PXAQJmKptYMksyFdVeOuaR6d7U8pG03zd8V4rFBYCgYiOSFgFVRDWF';

// { 'x-api-key' : 'YOUR_API_KEY' }

const refs = {
  catSelect: document.querySelector('.breed-select'),
  catDiv: document.querySelector('.cat-info'),
};

const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY =
  'live_0XRpC8Po01PXAQJmKptYMksyFdVeOuaR6d7U8pG03zd8V4rFBYCgYiOSFgFVRDWF';

const params = {
  header: {
    'x-api-key': 'API_KEY',
  },
};

function fetchBreeds() {
  const url = `${BASE_URL}/breeds123`;
  return fetch(url, params).then(response => {
    return response.json();
  });
}

fetchBreeds()
  .then(data => {
    console.log(data);
    refs.catSelect.insertAdjacentHTML('beforeend', createMarkupSelect(data));
  })
  .catch(err => console.log(err));

function createMarkupSelect(arr) {
  return arr
    .map(({ name, id }) => `<option value="${id}">${name}</option>`)
    .join('');
}

function createMarkupDiv(item) {
  return `<img src="https://cdn2.thecatapi.com/images/${item.reference_image_id}.jpg" alt="${item.name} ">
  <div class ="cat-description">  <h2>${item.name}</h2>
    <p>${item.description}</p>
    <p><span>Temperament : </span>${item.temperament}</p>
  </div>  `;
}

function fetchCatByBreed(breedId) {
  const url = `${BASE_URL}/images/search?breed_ids=${breedId}`;
  return fetch(url, params).then(response => {
    return response.json();
  });
}

refs.catSelect.addEventListener('input', onSelect);

function onSelect(e) {
  const currentCatId = e.currentTarget.value;

  fetchCatByBreed(currentCatId)
    .then(data => console.log(data))
    .catch(err => console.log(err));

  fetchBreeds()
    .then(data => {
      data.forEach(item => {
        if (item.id === currentCatId) {
          refs.catDiv.innerHTML = createMarkupDiv(item);
        }
      });
    })
    .catch(err => console.log(err));
}
