import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const BASE_URL = 'https://api.thecatapi.com/v1';
axios.defaults.headers.common['x-api-key'] =
  'live_0XRpC8Po01PXAQJmKptYMksyFdVeOuaR6d7U8pG03zd8V4rFBYCgYiOSFgFVRDWF';

function fetchBreeds() {
  return axios
    .get(`${BASE_URL}/breeds`)
    .then(response => {
      return response;
    })
    .catch(err => {
      console.log(err);
      Notify.failure('Oops! Something went wrong! Try reloading the page!', {
        position: 'center-top',
        timeout: 1500,
      });
    });
}

function fetchCatByBreed(breedId) {
  return axios
    .get(`${BASE_URL}/images/${breedId}`)
    .then(response => {
      if (response.status !== 200) {
        // refs.error.hidden = false;
        Notify.failure('Oops! Something went wrong! Try reloading the page!', {
          position: 'center-top',
          timeout: 1500,
        });
      }

      return response.data;
    })
    .catch(err => {
      console.log(err);
      refs.loader.hidden = true;
      Notify.failure('Oops! Something went wrong! Try reloading the page!', {
        position: 'center-top',
        timeout: 1500,
      });
    });
}

export { fetchBreeds, fetchCatByBreed };
