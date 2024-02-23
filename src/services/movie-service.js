class MovieService {
  _api = "https://api.themoviedb.org/3";
  _apiLang = "language=en-US";
  _apiKey = "api_key=a36c6fcbfb6dd5a72e28fbf2c19c3970";
  _apiImg = "https://image.tmdb.org/t/p/original";

  getResorce = async (url) => {
    const response = await fetch(url);

    if (!response.ok) {
      throw Error(`Could not fetch  ${url} status: ${response.status}`);
    }
    return response.json();
  };

  getMoviePopular = async () => {
    return this.getResorce(
      `${this._api}/movie/popular?${this._apiLang}&${this._apiKey}`
    );
  };

  getMovieTranding = async () => {
    const response = await this.getResorce(
      `${this._api}/movie/top_rated?${this._apiLang}&${this._apiKey}`
    );
    const movies = response.results;
    return movies && movies.map((movie) => this._transformMovie(movie));
  };

  getDetalieMovie = async (id) => {
    return this.getResorce(
      `${this._api}/movie/${id}?${this._apiLang}&${this._apiKey}`
    );
  };

  getRandomMovie = async () => {
    const res = await this.getMoviePopular();
    const movie = res.results[Math.floor(Math.random() * res.results.length)];
    return this._transformMovie(movie);
  };

  _transformMovie = (movie) => {
    return {
      name: movie.original_title,
      description: movie.overview,
      thumbnail: `${this._apiImg}${movie.poster_path}`,
      id: movie.id,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
    };
  };
}

export default MovieService;
