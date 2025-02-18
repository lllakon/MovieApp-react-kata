import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Flex, Pagination, Spin, Alert } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { fetchData } from '../../api/fetchData';
import { fetchGenres } from '../../api/fetchGenres';
import MovieCard from '../MovieCard/MovieCard';

import style from './MoviesList.module.css';

const MoviesList = ({ searchQuery, currentTab }) => {
  const [movies, setMovies] = useState([]);
  const [genresList, setGenresList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      if (searchQuery !== '' && currentPage !== 1) setCurrentPage(1);
      setLoading(true);

      try {
        const res = await fetchData(searchQuery, currentPage, currentTab);
        setMovies(res.results);
        setTotalPages(res.total_pages);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchGenresFromApi = async () => {
      try {
        const genres = await fetchGenres();
        setGenresList(genres.genres);
      } catch (error) {
        throw new Error('Failed to get list of genres', error);
      }
    };

    fetchDataFromAPI();
    fetchGenresFromApi();
  }, [currentPage, searchQuery, currentTab]);

  function getGenresByIds(genreIds) {
    if (!genresList.length) return [];
    return genreIds.map((id) => genresList.find((genre) => genre.id === id)?.name).filter(Boolean);
  }

  function handlePageChange(page) {
    setCurrentPage(page);
  }

  if (loading) {
    return (
      <Spin
        style={{ display: 'flex', justifyContent: 'center', marginTop: '140px' }}
        indicator={<LoadingOutlined spin style={{ fontSize: 48 }} />}
      />
    );
  }

  if (error) {
    console.error(error);
    return (
      <div className="error">
        <Alert
          message="Something went wrong 🙁"
          description={error}
          type="error"
          showIcon
          style={{ padding: '40px 70px' }}
        />
      </div>
    );
  }

  if (movies.length === 0) {
    return <Alert message="Nothing found" description="Try changing your search query" type="info" showIcon />;
  }

  return (
    <section className={style.MoviesList}>
      <Flex wrap gap="large">
        <MovieCard moviesData={movies} genresById={getGenresByIds} />
      </Flex>
      <Pagination
        current={currentPage}
        total={totalPages}
        onChange={handlePageChange}
        align="center"
        style={{ marginBottom: '17px', marginTop: '36px' }}
      />
    </section>
  );
};

MoviesList.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  currentTab: PropTypes.oneOf(['search', 'rated']).isRequired,
};

export default MoviesList;
