import { Typography, Box } from '@mui/material';
import Image from 'next/image';
import { Result } from '@/types';

interface AlbumResultProps {
  result: Result;
}

export const AlbumResult: React.FC<AlbumResultProps> = ({ result }) => {
  return (
    <Box display="flex" columnGap={4}>
      <Image
        src={result.artworkUrl100 ?? '/images/music-placeholder.jpg'}
        alt={result.collectionName}
        height={120}
        width={120}
      />
      <Box>
        <Typography variant="h4" component="h3">
          {result.collectionName}
        </Typography>
        <Typography variant="h5" component="h4">
          {result.artistName}
        </Typography>
      </Box>
    </Box>
  );
};
