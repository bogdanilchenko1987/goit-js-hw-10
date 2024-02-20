import './css/common.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { createMarkupDiv } from './helpers/createMarkupDiv';
import { createMarkupSelect } from './helpers/createMarkupSelect';
import { fetchBreeds, fetchCatByBreed } from './components/cat-api';

const refs = {
  catSelect: document.querySelector('.breed-select'),
  catDiv: document.querySelector('.cat-info'),
  loader: document.querySelector('.loading'),
};

refs.loader.hidden = false;

setTimeout(() => {
  fetchBreeds()
    .then(data => {
      refs.loader.hidden = true;
      refs.catSelect.hidden = false;
      refs.catSelect.insertAdjacentHTML(
        'beforeend',
        createMarkupSelect(data.data)
      );
    })
    .catch(err => {
      console.log(err);
      refs.catSelect.hidden = true;
    });
}, 300);

refs.catSelect.addEventListener('input', onSelect);

function onSelect(e) {
  const currentCatId = e.currentTarget.value;
  if (currentCatId !== 'choose') {
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
        .catch(err => {
          console.log(err);
          refs.loader.hidden = true;
          Notify.failure(
            'Oops! Something went wrong! Try reloading the page!',
            {
              position: 'center-top',
              timeout: 1500,
            }
          );
        });
    }, 300);
  } else
    Notify.success('Choose a cat breed', {
      position: 'center-top',
      timeout: 1500,
    });
}
