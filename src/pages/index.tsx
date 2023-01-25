/* eslint-disable react-hooks/exhaustive-deps */
import { Container } from '@mui/material';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { Searchbar, SearchResults } from '@/components';
import { SearchQueryParams } from '@/hooks';

type Params = ParsedUrlQuery & SearchQueryParams;

const defaultQueryParams: SearchQueryParams = { searchTerm: '', searchType: 'all', limit: 10 };

export default function Home() {
  const router = useRouter();

  const [queryParams, setQueryParams] = useState<SearchQueryParams>({} as SearchQueryParams);

  useEffect(() => {
    if (router.isReady) {
      if (router.query.searchType) {
        setQueryParams({ ...(router.query as Params), limit: 10 });
      } else {
        setQueryParams(defaultQueryParams);
      }
    }
  }, [router.isReady]);

  useEffect(() => {
    if (queryParams.searchType) {
      const { searchTerm, searchType } = queryParams;

      if ((searchTerm && router.query.searchTerm !== searchTerm) || router.query.searchType !== searchType) {
        router.push({ pathname: '/', query: { searchTerm, searchType } });
      }
    }
  }, [queryParams]);

  return queryParams.searchType ? (
    <>
      <Container component="header" maxWidth="lg" sx={{ py: 5 }}>
        <Searchbar queryParams={queryParams} setQueryParams={setQueryParams} />
      </Container>
      <Container component="main" maxWidth="lg" sx={{ pb: 4 }}>
        <SearchResults queryParams={queryParams} setQueryParams={setQueryParams} />
      </Container>
    </>
  ) : null;
}
