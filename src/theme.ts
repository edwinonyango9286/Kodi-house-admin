import { createTheme } from '@mui/material/styles';
import type { PaletteMode } from '@mui/material/styles'; 


// Augment the palette to include custom colors
declare module '@mui/material/styles' {
  interface Palette {
    custom: {
      light: string;
      main: string;
      dark: string;
    };
  }
  interface PaletteOptions {
    custom?: {
      light?: string;
      main?: string;
      dark?: string;
    };
  }
}

export const getDesignTokens = (mode: PaletteMode) => createTheme({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // Light mode palette
          primary: {
            main: '#1976d2',
          },
          secondary: {
            main: '#9c27b0',
          },
        }
      : {
          // Dark mode palette
          primary: {
            main: '#90caf9',
          },
          secondary: {
            main: '#ce93d8',
          },
          background: {
            default: '#121212',
            paper: '#1e1e1e',
          },
        }),
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
      MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#e6e6e6', 
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#e6e6e6', 
            borderWidth: '2px',
          },
        },
        notchedOutline: {
          borderColor: '#e6e6e6', 
        },
      },
    },
  },
});