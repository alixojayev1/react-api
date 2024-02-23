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
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      movies: [],
    };
    this.movieService = new MovieService();
  }
  componentDidMount() {
    this.getTrendingMovie();
  }
  onToggleOpen = () => {
    this.setState(({ open }) => ({ open: !open }));
  };

  getTrendingMovie = () => {
    this.movieService
      .getMovieTranding()
      .then((res) => {this.setState({ movies: res });})
      .catch(() => this.setState({ error: true }))
      .finally(() => this.setState({ loading: false }));
  };

  render() {
    const { open, movies, error, loading } = this.state;
    // const errorContent = error ? <Error /> : null;
    // const loadingContent = loading ? <Spiner /> : null;
    // const content = !(error || loading) ? <Content movies={movies} /> : null;

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

        <div className="app__rowmovie-lists">
          {movies.map((movie) => (
            <RowMoviesItem
              key={movie.id}
              movie={movie}
              onToggleOpen={this.onToggleOpen}
            />
          ))}
        </div>
        <Modal open={open} onClose={this.onToggleOpen}>
          <MovieInfo />
        </Modal>
      </div>
    );
  }
}

export default RowMovies;
