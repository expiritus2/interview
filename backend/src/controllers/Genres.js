// const genresService = require('../services/Genres');

class GenresController {
  static async get(req, res) {
    // const genresService = new GenresService();
    const genresService = require('../services/Genres');
    await genresService.load();
    genresService.getGenresByShowName(req.query.search);
    genresService.getShowsByGenres();

    res.send(genresService.shows);
  }
}

module.exports = GenresController;
