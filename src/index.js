import 'simplelightbox/dist/simple-lightbox.min.css';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import throttle from 'lodash.throttle';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';

import { refs } from './components/refs';
import {
  renderGallaryMarkup,
  clearGallaryMarkup,
} from './components/renderFunction';
import { imgApiService } from './components/img-service';

const SimpleLightboxData = {
  SimpleLightboxEl: null,
  addSimpleLightbox: function () {
    this.SimpleLightboxEl = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
  },
  deleteSimpleLightboxfunction() {
    this.SimpleLightboxEl.destroy();
  },
};

const messages = {
  notifyNoMatch:
    'Sorry, there are no images matching your search query. Please try again.',
  notifyReachedTotalHits:
    "We're sorry, but you've reached the end of search results.",
  empty: 'Please, enter something',
};

const uploadMoreImages = async () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (clientHeight + scrollTop >= scrollHeight - 5) {
    try {
      if (imgApiService.totalHits <= imgApiService.hitsShown) {
        Notify.warning(messages.notifyReachedTotalHits);
        return;
      }
      imgApiService.incrementPage();
      const { hits } = await imgApiService.getImg();
      SimpleLightboxData.deleteSimpleLightboxfunction();
      renderGallaryMarkup(hits);
      SimpleLightboxData.addSimpleLightbox();
    } catch (error) {
      console.log(error);
    }
  }
};

const onSubmit = async e => {
  e.preventDefault();
  clearGallaryMarkup();
  imgApiService.resetPage();
  imgApiService.hitsShown = 0;
  const searchQuery = e.target.searchQuery.value.trim().toLowerCase();
  if (!searchQuery) {
    Notify.warning(messages.empty);
    return;
  }

  imgApiService.query = searchQuery;
  const { hits, totalHits } = await imgApiService.getImg();
  if (!totalHits) {
    Notify.failure(messages.notifyNoMatch);
    return;
  }
  if (
    imgApiService.totalHits > 40 &&
    imgApiService.totalHits <= imgApiService.hitsShown
  ) {
    Notify.warning(messages.notifyReachedTotalHits);
    return;
  }
  Notify.success(`Hooray! We found ${totalHits} images.`);
  renderGallaryMarkup(hits);
  SimpleLightboxData.addSimpleLightbox();
};

window.addEventListener('scroll', throttle(uploadMoreImages, 2000));
refs.form.addEventListener('submit', onSubmit);
