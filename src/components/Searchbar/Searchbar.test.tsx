import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { render, renderHook, screen, waitFor } from '@/test/test-utils';
import { SearchQueryParams } from '@/hooks';

import { Searchbar } from './Searchbar';

jest.mock('@/hooks', () => ({
  useSearch: jest.fn(),
}));

const renderComponent = () => {
  const { result } = renderHook(() => useState<SearchQueryParams>({ searchTerm: '', searchType: 'all', limit: 10 }));
  const [queryParams, setQueryParams] = result.current;
  const user = userEvent.setup();

  render(<Searchbar queryParams={queryParams} setQueryParams={setQueryParams} />);

  return {
    user,
    queryParams,
    setQueryParams,
  };
};

describe('Searchbar component', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  test(`the component renders correctly`, () => {
    renderComponent();
    expect(screen.getByPlaceholderText('Search for an artist, album or song...')).toBeInTheDocument();
    expect(screen.getByLabelText('Song')).toBeInTheDocument();
  });

  test(`the text field updates the searchTerm param`, async () => {
    const { queryParams, user } = renderComponent();

    const textField = screen.getByPlaceholderText('Search for an artist, album or song...');

    await user.type(textField, 'some search term');
    waitFor(() => expect(queryParams.searchTerm).toEqual('some search term'));
  });

  test(`the filters update the searchType param`, async () => {
    const { queryParams, user } = renderComponent();

    const songFilter = screen.getByLabelText('Song');

    await user.click(songFilter);
    waitFor(() => expect(queryParams.searchType).toEqual('song'));
  });
});
