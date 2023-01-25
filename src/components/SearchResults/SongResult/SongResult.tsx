import { Typography, Box } from '@mui/material';
import Image from 'next/image';
import { Result } from '@/types';

interface SongResultProps {
  result: Result;
}

export const SongResult: React.FC<SongResultProps> = ({ result }) => {
  return (
    <Box display="flex" columnGap={4}>
      <Image
        src={result.artworkUrl100 ?? '/images/music-placeholder.jpg'}
        alt={result.collectionName ?? result.artistName}
        height={120}
        width={120}
      />
      <Box>
        <Typography variant="h4" component="h3">
          {result.trackName}
        </Typography>
        <Typography variant="h5" component="h4">
          {result.artistName}
        </Typography>
        <Typography variant="h6" component="h5" color="gray">
          {result.collectionName}
        </Typography>
      </Box>
    </Box>
  );
};
