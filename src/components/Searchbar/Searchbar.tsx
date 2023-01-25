import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, TextField } from '@mui/material';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import debounce from 'lodash.debounce';
import { SearchQueryParams, useSearch } from '@/hooks';
import { SearchType } from '@/types';

interface SearchbarProps {
  queryParams: SearchQueryParams;
  setQueryParams: Dispatch<SetStateAction<SearchQueryParams>>;
}

export const Searchbar: React.FC<SearchbarProps> = ({ queryParams, setQueryParams }) => {
  const { searchTerm, searchType } = queryParams;

  useSearch(queryParams);

  const handleTermChange = debounce((event: ChangeEvent<HTMLInputElement>) => {
    setQueryParams((params) => ({
      ...params,
      searchTerm: event.target.value,
    }));
  }, 300);

  const handleTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQueryParams((params) => ({
      ...params,
      searchType: event.target.value as SearchType,
      limit: 10,
    }));
  };

  return (
    <Stack component="form" spacing={2} onSubmit={(e) => e.preventDefault()}>
      <TextField
        id="search"
        placeholder={searchType === 'all' ? 'Search for an artist, album or song...' : `Search for an ${searchType}...`}
        size="medium"
        variant="outlined"
        fullWidth
        defaultValue={searchTerm}
        onChange={handleTermChange}
      />
      <FormControl onChange={handleTypeChange}>
        <FormLabel id="attribute-filter-group">Filter by...</FormLabel>
        <RadioGroup row aria-labelledby="attribute-filter-group" name="attribute-filter" value={queryParams.searchType}>
          <FormControlLabel value="all" control={<Radio />} label="All" />
          <FormControlLabel value="artist" control={<Radio />} label="Artist" />
          <FormControlLabel value="album" control={<Radio />} label="Album" />
          <FormControlLabel value="song" control={<Radio />} label="Song" />
        </RadioGroup>
      </FormControl>
    </Stack>
  );
};
