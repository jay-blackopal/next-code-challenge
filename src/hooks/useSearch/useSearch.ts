import { useSearchQuery } from '@/state/appApi';
import { SearchTypeParams, SearchType } from '@/types';

export interface SearchQueryParams {
  searchTerm?: string;
  searchType: SearchType;
  limit: number;
}

const searchTypeMap = {
  all: undefined,
  artist: { entity: 'musicArtist', attribute: 'artistTerm' },
  album: { entity: 'album', attribute: 'albumTerm' },
  song: { entity: 'song', attribute: 'songTerm' },
};

export const useSearch = ({ searchTerm, searchType, limit }: SearchQueryParams) => {
  return useSearchQuery(
    { term: searchTerm, ...(searchTypeMap[searchType] as SearchTypeParams), limit },
    { skip: !searchTerm || searchTerm?.length === 0 }
  );
};
