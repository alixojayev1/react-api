import React from "react";
import "./movie-info.scss";
import MovieService from "../../services/movie-service";
import Error from "../er/error";
import Spiner from "../spiner/spiner";

class MovieInfo extends React.Component {
  state = {
    movie: null,
    loading: true,
    error: false,
  };
  movieService = new MovieService();

  componentDidMount() {
    this.updateMovie();
  }
  updateMovie = () => {
    const { movieId } = this.props;
    if (!movieId) {
      this.setState({ error: true });
    }
    this.movieService
      .getDetalieMovie(movieId)
      .then((res) => this.setState({ movie: res }))
      .catch(() => this.setState({error:true}))
	  .finally(()=>this.setState({ loading:false}))
  };
  render() {
	const {movie, error, loading } = this.state;
	const errorContent = error ? <Error/> : null;
    const loaderContent = loading ? <Spiner /> : null;
    const content = !(error || loading) ? <Content movie={movie} /> : null;
    return (
      <div className="movieinfo">
         {errorContent}
		 {loaderContent}
		 {content}
      </div>
    );
  }
}

export default MovieInfo;

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
		</div>
	  </>
	);
  };
