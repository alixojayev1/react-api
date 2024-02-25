import "./row-movies.scss";
import RowMoviesItem from "../row-movies-item/row-movies-item";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import React from "react";
import MovieInfo from "../movie-info/movie-info";
import MovieService from "../../services/movie-service";
import Error from "../er/error";
import Spiner from "../spiner/spiner";

class RowMovies extends React.Component {
  state = {
    open: false,
    movies: [],
    movieId: null,
    error: false,
    loading: true,
    page: 2,
  };

  movieService = new MovieService();

  componentDidMount() {
    this.getTrendingMovie();
  }
  onOpen = (id) => this.setState({ open: true, movieId: id });
  onClose = () => this.setState({ open: false });

  getTrendingMovie = (page) => {
    this.movieService
      .getMovieTranding(page)
      .then((res) =>
        this.setState(({ movies }) => ({ movies: [...movies, ...res] }))
      )
      .catch(() => this.setState({ error: true }))
      .finally(() => this.setState({ loading: false }));
  };
  getReadMore = () => {
    this.setState(({ page }) => ({ page: page+1 }));
    this.getTrendingMovie(this.state.page);
  };

  render() {
    const { open, movies, movieId, error, loading } = this.state;
    const errorContent = error ? <Error /> : null;
    const loaderContent = loading ? <Spiner /> : null;
    const content = !(error || loading) ? (
      <Content movies={movies} onOpen={this.onOpen} />
    ) : null;

    return (
      <div className="app__rowmovie">
        <div className="app__rowmovie-top">
          <div className="app__rowmovie-top__title">
            <img src="/tranding.svg" alt="" />
            <h1>Trending</h1>
          </div>
          <div className="hr" />
          <a href="#">See more</a>
        </div>
        {errorContent}
        {loaderContent}
        {content}
        <div className="app__rowmovie__loadmore">
          <button className="btn btn__secondary" onClick={this.getReadMore}>
            LoadMore
          </button>
        </div>
        <Modal open={open} onClose={this.onClose}>
          <MovieInfo movieId={movieId} />
        </Modal>
      </div>
    );
  }
}

export default RowMovies;

const Content = ({ movies, onOpen }) => {
  return (
    <div className="app__rowmovie-lists">
      {movies.map((movie) => (
        <RowMoviesItem key={movie.id} movie={movie} onOpen={onOpen} />
      ))}
    </div>
  );
};
