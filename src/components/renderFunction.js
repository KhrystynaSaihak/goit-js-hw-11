import { refs } from './refs';

const createGallaryMarkup = data => {
  return data
    .map(item => {
      return `<li class="photo-card"><a href="${item.largeImageURL}">
      <div class="img-wrap">
  <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" />
  </div>
  <div class="info">
    <p class="info-item">
      <b>Likes</b><span>${item.likes}</span>
    </p>
    <p class="info-item">
      <b>Views</b><span>${item.views}</span>
    </p>
    <p class="info-item">
      <b>Comments</b><span>${item.comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads</b><span>${item.downloads}</span>
    </p>
  </div></a>
</li>`;
    })
    .join('');
};

const clearGallaryMarkup = () => {
  refs.galleryEl.innerHTML = '';
};

const renderGallaryMarkup = data => {
  refs.galleryEl.insertAdjacentHTML('beforeend', createGallaryMarkup(data));
};

export { renderGallaryMarkup, clearGallaryMarkup };
