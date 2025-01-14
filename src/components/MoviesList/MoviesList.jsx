import { useEffect, useState } from 'react';
import { Flex, Pagination } from 'antd';
import { fetchData } from '../../api/fetchData';
import { fetchGenres } from '../../api/fetchGenres';
import MovieCard from '../MovieCard/MovieCard';

import style from './MoviesList.module.css';

const MoviesList = ({searchQuery, currentTab}) => {
  const [movies, setMovies] = useState([]);
  const [genresList, setGenresList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      setLoading(true);
      try {
        const movies = await fetchData(searchQuery, currentPage, currentTab);
        setMovies(movies.results);
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
        throw new Error('Failed to get list of genres');
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
    return <p>Loading...</p>;
  }

  if (error) {
		console.error(error)
    return (
      <div className="error">
        <h3>Failed to load data 🙁</h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <section className={style.MoviesList}>
      <Flex wrap gap="large">
        <MovieCard moviesData={movies} genresById={getGenresByIds} />
      </Flex>
      <Pagination
        current={currentPage}
        total={50}
        pageSize={10}
        onChange={handlePageChange}
        align="center"
        style={{ marginBottom: '17px', marginTop: '36px' }}
      />
    </section>
  );
};

export default MoviesList;
