const apiToken = import.meta.env.VITE_API_TOKEN;
const API_URL = 'https://api.themoviedb.org/3';

const fetchAccountId = async () => {
  const response = await fetch(`${API_URL}/account`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${apiToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch account ID. HTTP status: ${response.status}`);
  }

  const data = await response.json();
  return data.id;
};

export const fetchData = async (searchQuery, page = 1) => {
  let params;
  const currentTab = sessionStorage.getItem('tab');

  const routes = {
    search: {
      default: '/trending/movie/week?language=en-US',
      query: `/search/movie?query=${searchQuery}&include_adult=true&language=en-US`,
    },
    rated: {
      default: '',
      query: `/search/movie?query=${searchQuery}&include_adult=true&language=en-US`,
    },
  };

  if (searchQuery === '') {
    if (currentTab === 'rated') {
      const accountId = await fetchAccountId();
      params = `/account/${accountId}/rated/movies?language=en-US`;
    } else {
      params = routes[currentTab]?.default;
    }
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
