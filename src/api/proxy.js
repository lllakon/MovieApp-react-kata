import axios from 'axios';

export default async function handler(req, res) {
  const { path } = req.query;

  try {
    const response = await axios.get(`https://api.themoviedb.org/3/${path}`, {
      params: req.query,
      headers: {
        Authorization: `Bearer YOUR_API_KEY`,
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
}
