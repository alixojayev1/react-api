import MovieService from "../../services/movie-service";
import Header from "../header/header";
import Hero from "../hero/hero";
import RowMovies from "../row-movies/row-movies";

const App = () => {
  const movieService = new MovieService();
  movieService.getMovieTranding().then((data) => console.log(data));
  return (
    <div className="app">
      <Header />
      <Hero />
      <RowMovies />
    </div>
  );
};

export default App;
