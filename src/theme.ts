import { createTheme } from '@mui/material';

const hue = '175';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: `hsl(${hue}, 60%, 85%)`,
    },
    background: {
      default: `hsl(${hue}, 80%, 5%)`,
      paper: `hsl(${hue}, 75%, 8%)`,
    },
  },
});
