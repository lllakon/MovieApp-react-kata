import PropTypes from 'prop-types';
import { Rate } from 'antd';
import truncateText from '../../utils/truncateText';

import noPosterImg from '../../img/noImage.png';
import style from './MovieCard.module.css';

const MovieCard = ({ moviesData, genresById }) => {

  return (
    <>
      {moviesData.map((movie) => {
        return (
          <div key={movie.id} className={style.card}>
            <img
              src={movie.poster_path === null ? noPosterImg : `http://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt="Movie poster"
              className={style.poster}
            />
            <div className={style.details}>
              <h2 className={style.title}>{movie.title}</h2>
              <p className={style.date}>{movie.release_date}</p>
              <div className={style.genres}>
                {genresById(movie.genre_ids).map((genre, index) => (
                  <span key={index}>{genre}</span>
                ))}
              </div>
              <p className={style.description}>{truncateText(movie.overview, 173)}</p>
              <div className={style.stars}>
                <Rate count={10} disabled defaultValue={movie.vote_average} />
              </div>
            </div>
            <div className={style.score}>
              <span>{movie.vote_average.toFixed(1)}</span>
            </div>
          </div>
        );
      })}
    </>
  );
};

MovieCard.propTypes = {
  moviesData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      release_date: PropTypes.string,
      genre_ids: PropTypes.arrayOf(PropTypes.number),
      overview: PropTypes.string,
      poster_path: PropTypes.string,
      vote_average: PropTypes.number.isRequired,
    })
  ).isRequired,
  genresById: PropTypes.func,
};

export default MovieCard;
