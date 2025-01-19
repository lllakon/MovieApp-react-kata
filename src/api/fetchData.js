const apiToken = import.meta.env.VITE_API_TOKEN;
const API_URL = 'https://api.themoviedb.org/3';

console.log(apiToken)

export const fetchData = async (searchQuery, page = 1) => {
  let params;
  let currentTab = sessionStorage.getItem('tab');

  const routes = {
    search: {
      default: '/trending/movie/week?language=en-US',
      query: `/search/movie?query=${searchQuery}&include_adult=true&language=en-US`,
    },
    rated: {
      default: '/movie/top_rated?language=en-US',
      query: `/search/movie?query=${searchQuery}&include_adult=true&language=en-US`,
    },
  };

  if (searchQuery === '') {
    params = routes[currentTab]?.default;
  } else {
    params = routes.search.query;
  }

  try {
    const response = await fetch(`${API_URL}${params}&page=${page}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};
