// src/api/marvel.ts
import axios from 'axios';
import md5 from 'crypto-js/md5';

// Marvel API base URL
const baseURL = 'https://gateway.marvel.com/v1/public';

// Environment variables
const publicKey = import.meta.env.VITE_MARVEL_PUBLIC_KEY;
const privateKey = import.meta.env.VITE_MARVEL_PRIVATE_KEY;

// Marvel API requires a timestamp, public key, and a hash (ts + private + public)
const ts = Date.now().toString();
const hash = md5(ts + privateKey + publicKey).toString();

// Axios instance with auth params
const marvelAPI = axios.create({
  baseURL,
  params: {
    ts,
    apikey: publicKey,
    hash,
  },
});

/**
 * Fetch characters with pagination
 * @param page Page number (starts at 1)
 * @param limit Items per page (default 10)
 */
export const fetchCharacters = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;

  const response = await marvelAPI.get('/characters', {
    params: {
      limit,
      offset,
    },
  });

  return response.data.data; // Includes: results, total, count, etc.
};

/**
 * Fetch a single comic's details (including thumbnail) using its resourceURI
 * @param uri Full Marvel API resource URI of the comic
 */
export const fetchComicByURI = async (uri: string) => {
  const relativeURL = uri.replace('http://gateway.marvel.com/v1/public', '');
  const response = await marvelAPI.get(relativeURL);
  return response.data.data.results[0];
};
