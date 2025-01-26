import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Rate } from 'antd';
import { fetchRating } from '../../api/fetchRating';
import MovieVoteAverage from '../MovieVoteAverage/MovieVoteAverage';
import truncateText from '../../utils/truncateText';

import noPosterImg from '../../img/noImage.png';
import style from './MovieCard.module.css';

const MovieCard = ({ moviesData, genresById }) => {
  const [userRatings, setUserRatings] = useState({});
  const [ratingQueue, setRatingQueue] = useState([]);

  const userRatingHandler = (movieId, value) => {
    setUserRatings((prev) => ({
      ...prev,
      [movieId]: value,
    }));

    setRatingQueue((prev) => [...prev, { movieId, value }]);
    localStorage.setItem(movieId, value);
  };

  useEffect(() => {
    const sendRatings = async () => {
      if (ratingQueue.length === 0) return;

      const [currentRating, ...remainingQueue] = ratingQueue;
      const { movieId, value } = currentRating;

      try {
        await fetchRating(movieId, value);
      } catch (error) {
        console.error(`Ошибка при отправке рейтинга`, error);
      } finally {
        setRatingQueue(remainingQueue);
      }
    };

    sendRatings();
  }, [ratingQueue]);

  return (
    <>
      {moviesData.map((movie) => {
        const userRating = parseFloat(localStorage.getItem(movie.id)) || userRatings[movie.id] || movie.vote_average;

        return (
          <div key={movie.id} className={style.card}>
            <img
              src={movie.poster_path === null ? noPosterImg : `https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
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
                <Rate count={10} value={userRating} onChange={(value) => userRatingHandler(movie.id, value)} />
              </div>
            </div>

            <MovieVoteAverage voteAverage={movie.vote_average} />
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
  genresById: PropTypes.func.isRequired,
};

export default MovieCard;
