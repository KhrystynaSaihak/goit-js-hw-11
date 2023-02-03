import Axios from 'axios';

class ImgApiService {
  static API_KEY = '2783286-0a3dbea03ea42b414ebcbec50';
  static URL = 'https://pixabay.com/api/';
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.hitsShown = 0;
    this.totalHits = 0;
  }

  async getImg() {
    const options = {
      key: ImgApiService.API_KEY,
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 40,
      page: this.page,
    };

    const { data } = await Axios.get(ImgApiService.URL, { params: options });

    this.hitsShown += data.hits.length;
    this.totalHits = data.totalHits;

    return data;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

export const imgApiService = new ImgApiService();
