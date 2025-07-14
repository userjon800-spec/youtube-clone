import axios from 'axios';

const BASE_URL = 'https://www.googleapis.com/youtube/v3';
const API_KEY = process.env.REACT_APP_PUBLIC_KEYS;

export const ApiService = {
  async fetching(url, params = {}) {
    try {
      const defaultPar = {
        key: `${API_KEY}`
      };
      if (url === "search") {
        defaultPar.part = 'snippet';
        defaultPar.type = 'video';
        defaultPar.maxResults = 50;
        if (params.q) defaultPar.q = params.q;
      }
      if (url === "videos") {
        defaultPar.part = 'snippet,statistics';
      }
      const response = await axios.get(`${BASE_URL}/${url}`, {
        params: {
          ...defaultPar,
          ...params,
        },
      });
      return response.data;
    } catch (error) {
      console.error('YouTube API xatolik:', error?.response?.data || error.message);
      throw error;
    }
  },
};
