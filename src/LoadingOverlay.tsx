import { Box, BoxProps, CircularProgress, alpha } from '@mui/material';
import { FC } from 'react';

export const LoadingOverlay: FC<BoxProps> = (allProps) => {
  const { sx, ...props } = allProps;
  return (
    <Box
      sx={{
        background: (theme) => alpha(theme.palette.background.default, 0.5),
        position: 'absolute',
        inset: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '2rem',
        ...sx,
      }}
      {...props}
    >
      <CircularProgress size={'1em'} />
    </Box>
  );
};
