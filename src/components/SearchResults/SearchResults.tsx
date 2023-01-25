import { CircularProgress, Divider, List, ListItem, Typography, Box, Fade } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { SearchQueryParams, useSearch } from '@/hooks';
import { SongResult } from './SongResult/SongResult';
import { AlbumResult } from './AlbumResult/AlbumResult';
import { ArtistResult } from './AritstResult/ArtistResult';

interface SearchResultsProps {
  queryParams: SearchQueryParams;
  setQueryParams: Dispatch<SetStateAction<SearchQueryParams>>;
}

const Loader = () => (
  <Box sx={{ display: 'flex', justifyContent: 'space-around' }} py={20}>
    <CircularProgress size={150} />
  </Box>
);

export const SearchResults: React.FC<SearchResultsProps> = ({ queryParams, setQueryParams }) => {
  const { searchType } = queryParams;
  const { data, isLoading } = useSearch(queryParams);

  if (isLoading) {
    return <Loader />;
  }

  if (!data) {
    return (
      <Typography variant="h3" component="h2" textAlign="center" pt={10}>
        Type in the searchbar above to find your favourite Artist, Album or Song
      </Typography>
    );
  }

  const loadMoreResults = () => {
    setQueryParams((params) => ({
      ...params,
      limit: params.limit + 10,
    }));
  };

  return data.results.length ? (
    <>
      <Typography variant="h3" component="h2">
        Results
      </Typography>
      <InfiniteScroll
        dataLength={data.results.length}
        next={loadMoreResults}
        hasMore={data.results.length < 200}
        loader={<Loader />}
        endMessage={
          <Typography textAlign="center" fontWeight="bold" py={4}>
            There are no more results, try filtering if you did not find the result you wanted
          </Typography>
        }
      >
        <List component="ol">
          {data.results.map((result) => (
            <React.Fragment key={JSON.stringify(result)}>
              <Fade in mountOnEnter unmountOnExit>
                <ListItem>
                  {(searchType === 'song' || searchType === 'all') && <SongResult result={result} />}
                  {searchType === 'album' && <AlbumResult result={result} />}
                  {searchType === 'artist' && <ArtistResult result={result} />}
                </ListItem>
              </Fade>
              <Divider component="li" />
            </React.Fragment>
          ))}
        </List>
      </InfiniteScroll>
    </>
  ) : (
    <Typography variant="h3" component="h2" textAlign="center" pt={10}>
      No results were returned for your search, maybe try another filter
    </Typography>
  );
};
