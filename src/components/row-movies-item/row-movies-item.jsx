import "./row-movies-item.scss";

const RowMoviesItem = ({ movie, onToggleOpen }) => {
  
  return (
    <div className="list__item" onClick={onToggleOpen}>
      <img src={movie.thumbnail} alt={movie.title} />
      <h2>{movie.name.length > 15 ? `${movie.name.slice(0,15)}...` : movie.name}</h2>
      <div className="list__item-descr">
        <p>{movie.release_date}</p>
        <div className="dot" />
        <p>{movie.vote_average.toFixed(1)}</p>
      </div>
    </div>
  );
};

export default RowMoviesItem;
