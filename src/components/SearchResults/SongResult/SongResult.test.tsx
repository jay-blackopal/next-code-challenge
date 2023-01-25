import { render, screen } from '@/test/test-utils';

import { mockResult } from '@/test/mocks';
import { SongResult } from './SongResult';

describe('AlbumResult component', () => {
  test(`component renders correctly`, () => {
    render(<SongResult result={mockResult} />);

    expect(screen.getByAltText(mockResult.collectionName)).toBeInTheDocument();
    expect(screen.getByText(mockResult.trackName)).toBeInTheDocument();
    expect(screen.getByText(mockResult.artistName)).toBeInTheDocument();
    expect(screen.getByText(mockResult.collectionName)).toBeInTheDocument();
  });
});
