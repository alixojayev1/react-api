import "./row-movies.scss";
import RowMoviesItem from "../row-movies-item/row-movies-item";
import movies from "../../constants";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import React from "react";
import MovieInfo from "../movie-info/movie-info";

class RowMovies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  onToggleOpen = () => {
    this.setState(({ open }) => ({ open: !open }));
  };
  render() {
    const { open } = this.state;
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
          {movies.map((movie, idx) => (
            <RowMoviesItem
              key={idx}
              movie={{ ...movie, index: idx }}
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
