import { Typography, Box } from '@mui/material';
import Image from 'next/image';
import { Result } from '@/types';

interface ArtistResultProps {
  result: Result;
}

export const ArtistResult: React.FC<ArtistResultProps> = ({ result }) => {
  return (
    <Box display="flex" alignItems="center" columnGap={4}>
      <Image src="/images/music-placeholder.jpg" alt={result.artistName} height={120} width={120} />
      <Box>
        <Typography variant="h4" component="h3">
          {result.artistName}
        </Typography>
      </Box>
    </Box>
  );
};
