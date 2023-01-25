import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { render, renderHook, screen } from '@/test/test-utils';
import { SearchQueryParams } from '@/hooks';

import { SearchResults } from './SearchResults';

import * as hooksModules from '@/hooks';
import { mockResult } from '@/test/mocks';

jest.mock('@/hooks', () => ({
  useSearch: jest.fn(),
}));

const renderComponent = () => {
  const { result } = renderHook(() => useState<SearchQueryParams>({ searchTerm: '', searchType: 'all', limit: 10 }));
  const [queryParams, setQueryParams] = result.current;

  render(<SearchResults queryParams={queryParams} setQueryParams={setQueryParams} />);

  return {
    queryParams,
    setQueryParams,
  };
};

describe('SearchResults component', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  test(`results are displayed if the search has results`, () => {
    jest.spyOn(hooksModules, 'useSearch').mockImplementation(() => ({ data: { results: [mockResult] } } as any));
    renderComponent();

    const resultsText = screen.getByText('Results');

    expect(resultsText).toBeInTheDocument();
  });

  test(`a no search message is displayed if a search has not been performed`, () => {
    jest.spyOn(hooksModules, 'useSearch').mockImplementation(() => ({ data: undefined } as any));
    renderComponent();

    const noSearchText = screen.getByText('Type in the searchbar above to find your favourite Artist, Album or Song');

    expect(noSearchText).toBeInTheDocument();
  });

  test(`a no results message is displayed if there are no results`, () => {
    jest.spyOn(hooksModules, 'useSearch').mockImplementation(() => ({ data: { results: [] } } as any));
    renderComponent();

    const noResultsText = screen.getByText('No results were returned for your search, maybe try another filter');

    expect(noResultsText).toBeInTheDocument();
  });
});
