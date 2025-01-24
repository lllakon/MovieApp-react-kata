const apiToken = import.meta.env.VITE_API_TOKEN;
const API_URL = 'https://api.themoviedb.org/3/genre/movie/list?language=en';

export const fetchGenres = async () => {
  const response = await fetch(`${API_URL}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${apiToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Genres HTTP error! status: ${response.status}`);
  }

  return await response.json();
};
