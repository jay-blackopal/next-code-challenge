import { render, screen } from '@/test/test-utils';

import { mockResult } from '@/test/mocks';
import { ArtistResult } from './ArtistResult';

describe('AlbumResult component', () => {
  test(`component renders correctly`, () => {
    render(<ArtistResult result={mockResult} />);

    expect(screen.getByAltText(mockResult.artistName)).toBeInTheDocument();
    expect(screen.getByText(mockResult.artistName)).toBeInTheDocument();
  });
});
