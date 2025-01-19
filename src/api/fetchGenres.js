const apiToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOGZlMGQ2ZGU3N2Y5ZDhlNjA3ZGYxODhiMzM5NWJkZCIsIm5iZiI6MTczNjcwMTU4Ny40MDYwMDAxLCJzdWIiOiI2NzgzZjY5MzIxOGZkNTdhY2Y0ZjE3ODMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.vz6fDS7E2x3d3mgmvrs6kmyHreSiL4YjqEZLbusn6BY';
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
