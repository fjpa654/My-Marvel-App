src/
├── api/
│   └── marvel.ts
├── assets/
│   └── react.svg
├── components/
│   ├── Character/
│   │   ├── CharacterCard.tsx
│   │   ├── CharacterGrid.tsx
│   │   └── CharacterDetail.tsx ← new
│   ├── Comic/
│   │   ├── ComicCard.tsx ← new
│   │   ├── ComicGrid.tsx ← new
│   │   └── ComicDetail.tsx ← new
│   ├── Story/
│   │   ├── StoryCard.tsx ← new
│   │   └── StoryDetail.tsx ← new
│   ├── Common/
│   │   ├── Loader.tsx
│   │   ├── EmptyState.tsx
│   │   ├── Pagination.tsx
│   │   └── SearchBar.tsx
│   └── Favorites/
│       └── BookmarkButton.tsx ← new
├── pages/
│   ├── Home.tsx
│   ├── Characters.tsx ← new
│   ├── Comics.tsx ← new
│   ├── Stories.tsx ← new
│   └── Favorites.tsx ← new
├── hooks/
│   └── useFetchCharacters.ts
│   └── useFavorites.ts ← new
├── styles/
│   └── app.css
├── App.tsx
├── main.tsx
└── index.css
