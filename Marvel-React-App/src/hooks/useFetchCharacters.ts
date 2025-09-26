import { useEffect, useState } from 'react';
import { fetchCharacters, fetchComicByURI } from '../api/marvel';

interface ComicThumb {
  path: string;
  extension: string;
}

interface EnrichedCharacter {
  name: string;
  description: string;
  comicThumbs: ComicThumb[];
}

export function useFetchCharacters(page: number, itemsPerPage: number) {
  const [characters, setCharacters] = useState<EnrichedCharacter[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCharacters = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchCharacters(page, itemsPerPage);
        const chars = data.results;
        const total = data.total;
        setTotalPages(Math.ceil(total / itemsPerPage));

        const enriched = await Promise.all(
          chars.map(async (char: any) => {
            const thumbs = await Promise.all(
              char.comics.items.slice(0, 2).map(async (comic: any) => {
                try {
                  const comicData = await fetchComicByURI(comic.resourceURI);
                  const thumb = comicData.thumbnail;
                  if (thumb.path.includes('image_not_available')) return null;
                  return thumb;
                } catch {
                  return null;
                }
              })
            );

            const filteredThumbs = thumbs.filter(Boolean);
            if (filteredThumbs.length === 0) return null;

            return {
              name: char.name,
              description: char.description,
              comicThumbs: filteredThumbs,
            };
          })
        );

        setCharacters(enriched.filter(Boolean) as EnrichedCharacter[]);
      } catch (err) {
        console.error('❌ Failed to fetch characters:', err);
        setError('Failed to load characters. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadCharacters();
  }, [page, itemsPerPage]);

  return {
    characters,
    loading,
    totalPages,
    error,
  };
}
