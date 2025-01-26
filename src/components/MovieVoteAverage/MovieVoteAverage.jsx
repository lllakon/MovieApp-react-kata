import { useMemo } from 'react';
import PropTypes from 'prop-types';
import style from './MovieVoteAverage.module.css';

const MovieVoteAverage = ({ voteAverage }) => {
  const averageColor = useMemo(() => {
    if (voteAverage <= 3) return '#E90000';
    if (voteAverage <= 5) return '#E97E00';
    if (voteAverage <= 7) return '#E9D100';
    return '#66E900';
  }, [voteAverage]);

  return (
    <div className={style.average} style={{ border: `2px solid ${averageColor}` }}>
      <span>{voteAverage.toFixed(1)}</span>
    </div>
  );
};

MovieVoteAverage.propTypes = {
  voteAverage: PropTypes.number.isRequired,
};

export default MovieVoteAverage;
