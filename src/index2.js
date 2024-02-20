import axios from 'axios';
import './css/common.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

axios.defaults.headers.common['x-api-key'] =
  'live_0XRpC8Po01PXAQJmKptYMksyFdVeOuaR6d7U8pG03zd8V4rFBYCgYiOSFgFVRDWF';

const refs = {
  catSelect: document.querySelector('.breed-select'),
  catDiv: document.querySelector('.cat-info'),
  error: document.querySelector('.error'),
  loader: document.querySelector('.loading'),
  option: document.querySelector('.option'),
};

const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY =
  'live_0XRpC8Po01PXAQJmKptYMksyFdVeOuaR6d7U8pG03zd8V4rFBYCgYiOSFgFVRDWF';

const params = {
  header: {
    'x-api-key': API_KEY,
  },
};

function fetchBreeds() {
  const url = `${BASE_URL}/breeds`;
  return fetch(url, params).then(response => {
    if (!response.ok) {
      // refs.error.hidden = false;
      Notify.failure('Oops! Something went wrong! Try reloading the page!', {
        position: 'center-top',
      });
    }
    return response.json();
  });
}

refs.loader.hidden = false;
setTimeout(() => {
  fetchBreeds()
    .then(data => {
      refs.loader.hidden = true;
      refs.catSelect.hidden = false;
      refs.catSelect.insertAdjacentHTML('beforeend', createMarkupSelect(data));
    })
    .catch(err => console.log(err));
}, 500);

function createMarkupSelect(arr) {
  return arr
    .map(
      ({ name, reference_image_id }) =>
        `<option value="${reference_image_id}">${name}</option>`
    )
    .join('');
}

function createMarkupDiv(item) {
  return `<img src="${item.url}" alt="${item.breeds[0].name} ">
  <div class ="cat-description">  <h2>${item.breeds[0].name}</h2>
    <p>${item.breeds[0].description}</p>
    <p><span>Temperament : </span>${item.breeds[0].temperament}</p>
  </div>  `;
}

function fetchCatByBreed(breedId) {
  const url = `${BASE_URL}/images/${breedId}`;
  return fetch(url, params).then(response => {
    if (!response.ok) {
      // refs.error.hidden = false;
      Notify.failure('Oops! Something went wrong! Try reloading the page!', {
        position: 'center-top',
      });
    }
    return response.json();
  });
}

refs.catSelect.addEventListener('input', onSelect);

function onSelect(e) {
  const currentCatId = e.currentTarget.value;

  refs.loader.hidden = false;
  refs.catDiv.innerHTML = '';

  setTimeout(() => {
    fetchCatByBreed(currentCatId)
      .then(data => {
        if (currentCatId === data.id) {
          refs.catDiv.innerHTML = createMarkupDiv(data);
        }
        refs.loader.hidden = true;
      })
      .catch(err => console.log(err));
  }, 500);
}
