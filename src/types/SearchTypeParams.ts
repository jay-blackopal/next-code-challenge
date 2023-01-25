export type SearchTypeParams =
  | { entity: 'musicArtist'; attribute: 'artistTerm' }
  | { entity: 'album'; attribute: 'albumTerm' }
  | { entity: 'song'; attribute: 'songTerm' };
