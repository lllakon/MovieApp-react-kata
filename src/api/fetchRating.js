const apiToken = import.meta.env.VITE_API_TOKEN;
const API_URL = 'https://api.themoviedb.org/3/movie/';

export const fetchRating = async (movieId, rating) => {
  const response = await fetch(`${API_URL}${movieId}/rating`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiToken}`,
      'Content-Type': 'application/json;charset=utf-8',
      accept: 'application/json',
    },
		body: JSON.stringify({ value: rating }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};
