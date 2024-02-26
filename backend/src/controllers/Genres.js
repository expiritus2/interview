// const genresService = require('../services/Genres');

class GenresController {
  static async get(req, res) {
    // const genresService = new GenresService();
    const genresService = require('../services/Genres');
    await genresService.load();
    await genresService.getGenresByShowName(req.query.search);
    await genresService.getShowsByGenres();
    res.send(genresService.shows);
  }
}

module.exports = GenresController;
