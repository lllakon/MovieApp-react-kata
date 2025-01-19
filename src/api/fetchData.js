// const apiToken = import.meta.env.VITE_API_TOKEN;
const apiToken =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOGZlMGQ2ZGU3N2Y5ZDhlNjA3ZGYxODhiMzM5NWJkZCIsIm5iZiI6MTczNjcwMTU4Ny40MDYwMDAxLCJzdWIiOiI2NzgzZjY5MzIxOGZkNTdhY2Y0ZjE3ODMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.vz6fDS7E2x3d3mgmvrs6kmyHreSiL4YjqEZLbusn6BY';
const API_URL = 'https://api.themoviedb.org/3';

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
};
