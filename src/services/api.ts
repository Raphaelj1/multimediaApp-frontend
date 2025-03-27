import axios from 'axios';

export const fetchOutput = async (prompt: string, type: string) => {
  const response = await axios.post('http://localhost:3000/generate', { prompt, type });
  return response.data;
};