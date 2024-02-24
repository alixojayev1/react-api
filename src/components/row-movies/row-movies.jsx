import "./row-movies.scss";
import RowMoviesItem from "../row-movies-item/row-movies-item";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import React from "react";
import MovieInfo from "../movie-info/movie-info";
import MovieService from "../../services/movie-service";


class RowMovies extends React.Component {
  state = {
    open: false,
    movies: [],
    movieId: null,
  };

  movieService = new MovieService();

  componentDidMount() {
    this.getTrendingMovie();
  }
  onOpen = (id) => this.setState({ open: true, movieId: id  });
  onClose = () => this.setState({ open: false});

  getTrendingMovie = () => {
    this.movieService.getMovieTranding().then((res) => {
      this.setState({ movies: res });
    });
  };

  render() {
    const { open, movies, movieId } = this.state;

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
            <RowMoviesItem key={movie.id} movie={movie} onOpen={this.onOpen} />
          ))}
        </div>
        <Modal open={open} onClose={this.onClose}>
          <MovieInfo movieId={movieId} />
        </Modal>
      </div>
    );
  }
}

export default RowMovies;
