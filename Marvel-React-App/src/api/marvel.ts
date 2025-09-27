// src/api/marvel.ts
import axios from 'axios';
import md5 from 'crypto-js/md5';

const baseURL = 'https://gateway.marvel.com/v1/public';

const publicKey = import.meta.env.VITE_MARVEL_PUBLIC_KEY;
const privateKey = import.meta.env.VITE_MARVEL_PRIVATE_KEY;

const ts = Date.now().toString();
const hash = md5(ts + privateKey + publicKey).toString();

const marvelAPI = axios.create({
  baseURL,
  params: {
    ts,
    apikey: publicKey,
    hash,
  },
});

export const fetchCharacters = async (
  page = 1,
  limit = 10,
  nameStartsWith: string = ''
) => {
  const offset = (page - 1) * limit;

  const params: Record<string, string | number> = {
    limit,
    offset,
  };

  if (nameStartsWith.trim()) {
    params.nameStartsWith = nameStartsWith.trim();
  }

  const response = await marvelAPI.get('/characters', { params });
  return response.data.data;
};

export const fetchComicByURI = async (uri: string) => {
  const relativeURL = uri.replace('http://gateway.marvel.com/v1/public', '');
  const response = await marvelAPI.get(relativeURL);
  return response.data.data.results[0];
};
