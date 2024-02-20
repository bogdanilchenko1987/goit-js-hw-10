function createMarkupDiv(item) {
  return `<img src="${item.url}" alt="${item.breeds[0].name} ">
  <div class ="cat-description">  <h2>${item.breeds[0].name}</h2>
    <p>${item.breeds[0].description}</p>
    <p><span>Temperament : </span>${item.breeds[0].temperament}</p>
  </div>  `;
}

export { createMarkupDiv };
