import React from 'react';

interface ComicThumb {
  path: string;
  extension: string;
}

interface CharacterCardProps {
  name: string;
  comicThumbs: ComicThumb[];
}

const CharacterCard: React.FC<CharacterCardProps> = ({ name, comicThumbs }) => {
  // Pick the first valid thumbnail (ignores 'image_not_available')
  const firstThumb = comicThumbs.find(
    (thumb) => !thumb.path.includes('image_not_available')
  );

  if (!firstThumb) return null;

  const imageUrl = `${firstThumb.path}/portrait_xlarge.${firstThumb.extension}`;

  return (
    <div
      style={{
        backgroundColor: '#1a1a1a',
        borderRadius: '8px',
        padding: '0.5rem',
        textAlign: 'center',
        width: '150px',
      }}
    >
    <img
    src={imageUrl}
    alt={`${name} comic`}
    loading="lazy" // 👈 this defers loading until needed
    style={{
        borderRadius: '6px',
        width: '150px',
        height: '225px',
        objectFit: 'cover',
        marginBottom: '0.5rem',
    }}
    />

      <h3
        style={{
          color: '#f2f2f2',
          fontSize: '0.9rem',
          lineHeight: '1.2',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {name}
      </h3>
    </div>
  );
};

export default CharacterCard;
