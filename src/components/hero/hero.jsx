import React from "react";
import "./hero.scss";
import MovieService from "../../services/movie-service";
import Spiner from "../spiner/spiner";
import Error from "../er/error";

class Hero extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {},
      loading: true,
      error: false,
    };
    this.movieService = new MovieService();
    this.getMovie();
  }
  getMovie = () => {
    this.movieService
      .getRandomMovie()
      .then((res) => this.setState({ movie: res }))
      .catch(() => this.setState({ error: true }))
      .finally(() => this.setState({ loading: false }));
  };
  render() {
    const { movie, loading, error } = this.state;
    const errorContent = error ? <Error /> : null;
    const loaderContent = loading ? <Spiner /> : null;
    const content = !(error || loading) ? <Content movie={movie} /> : null;
    return (
      <div className="app__hero">
        <div className="app__hero-info">
          <h2>FIND MOVIES</h2>
          <h1>TV shows and more</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
            sapiente sit placeat minus dolorum, magnam, tempora quas neque
            quasi, sequi odit doloremque velit saepe autem facilis! Laudantium
            consequatur accusantium mollitia.
          </p>
          <button className="btn btn__primary">DETAILS</button>
        </div>
        <div className="app__hero-moive">
          {errorContent}
          {loaderContent}
          {content}
        </div>
      </div>
    );
  }
}

export default Hero;

const Content = ({ movie }) => {
  return (
    <>
      <img src={movie.thumbnail} alt="img" />
      <div className="app__hero-moive__descr">
        <h2>{movie.name}</h2>
        <p>
          {movie.description && movie.description.length >= 250
            ? `${movie.description.slice(0, 250)}...`
            : movie.description}
        </p>
        <div>
          <button className="btn btn__secondary">RANDOM MOVIE</button>
          <button className="btn btn__primary">DETAILS</button>
        </div>
      </div>
    </>
  );
};
