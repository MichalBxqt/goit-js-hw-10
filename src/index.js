import axios from 'axios';
import { fetchCatByBreed, fetchBreeds } from './cat-api';

axios.defaults.headers.common['x-api-key'] = `live_0VpsqzG8YAdG2YHxrRkxwFsBWY3ssJp2M5ninRCPdBy0vaQWPVj4UxFrj6xvETPn`;
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

const breedsEl = document.querySelector('.breed-select');
const breedInfoEl = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');

/** @type {HTMLSelectElement | null} */

function showLoader() {
  loaderEl.style.display = 'block';
}

function hideLoader() {
  loaderEl.style.display = 'none';
}

function showError() {
  errorEl.style.display = 'block';
}

function hideError() {
  errorEl.style.display = 'none';
}

// wybieranie rasy z listy
fetchBreeds()
  .then(data => {
    const html = data.map(
      breed => `<option value=${breed.id}> ${breed.name} </option>)`
    );
    breedsEl.innerHTML = html;
    hideError();
  })
  .catch(() => {
    showError();
  })
  .finally(() => {
    hideLoader();
  });

// nazwa/temperament/opis/zdj pojawiające się po wybraniu rasy z listy
breedsEl.addEventListener('change', ev => {
  breedInfoEl.innerHTML = '';
  const breedId = ev.target.value;
  showLoader();

  fetchCatByBreed(breedId)
    .then(cats => {
      const array = cats.map(
        cat =>
          `<h2>${cat.breeds[0].name}</h2>
      <p>${cat.breeds[0].description}</p>
        <p>${cat.breeds[0].temperament}</p>
          <img width="700" height="500" src=${cat.url} />`
      );
      breedInfoEl.innerHTML = array.join(cats);
      hideError();
    })
    .catch(() => {
      showError();
    })
    .finally(() => {
      hideLoader();
    });
});
