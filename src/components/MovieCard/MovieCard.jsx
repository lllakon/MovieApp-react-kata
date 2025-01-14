import { Rate } from 'antd';
import useTruncateText from '../../hooks/useTruncateText';

import noPosterImg from '../../img/noImage.png';
import style from './MovieCard.module.css';

const MovieCard = ({ moviesData, genresById }) => {
  return (
    <>
      {moviesData.map((movie) => {
        const textRef = useTruncateText(movie.overview, 133);
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
              <p className={style.description} ref={textRef}>
                {movie.overview}
              </p>
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

export default MovieCard;
