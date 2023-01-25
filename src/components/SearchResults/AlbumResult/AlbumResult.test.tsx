import { render, screen } from '@/test/test-utils';

import { mockResult } from '@/test/mocks';
import { AlbumResult } from './AlbumResult';

describe('AlbumResult component', () => {
  test(`component renders correctly`, () => {
    render(<AlbumResult result={mockResult} />);

    expect(screen.getByAltText(mockResult.collectionName)).toBeInTheDocument();
    expect(screen.getByText(mockResult.collectionName)).toBeInTheDocument();
    expect(screen.getByText(mockResult.artistName)).toBeInTheDocument();
  });
});
