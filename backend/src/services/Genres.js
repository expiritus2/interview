const axios = require('axios');
const BadRequestError = require('../errors/BadRequestError');

class GenresService {
  list = [];
  genres = []
  shows = [];

  constructor() {
    this.list = [];
    this.genres = [];
    this.shows = [];
  }

  async load() {
    try {
      const response = await axios.get('https://api.tvmaze.com/search/shows?q=banana');
      this.list = response.data;
    } catch (err) {
      throw new BadRequestError();
    }
  }

  getGenresByShowName(search) {
    this.list = this.list.filter((item) => {
      return item.show.name.toLowerCase().includes(search.toLowerCase());
    });

    this.genres = this.list.map((item) => item.show.genres).flat(1);
    this.genres = [...new Set(this.genres)];
  }

  getShowsByGenres() {
    this.shows = this.genres.reduce((acc, genre) => {
      acc[genre] = this.list.filter((item) => item.show.genres.includes(genre))
      return acc
    }, {})
  }
}

module.exports = new GenresService();
