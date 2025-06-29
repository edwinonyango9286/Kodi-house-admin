import { createTheme } from "@mui/material/styles";
import type { PaletteMode } from "@mui/material/styles";
import type {} from "@mui/x-data-grid/themeAugmentation";

declare module "@mui/material/styles" {
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
export const getDesignTokens = (mode: PaletteMode) =>
  createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            primary: {
              main: "#1976d2",
            },
            secondary: {
              main: "#9c27b0",
            },
          }
        : {
            primary: {
              main: "#90caf9",
            },
            secondary: {
              main: "#ce93d8",
            },
            background: {
              default: "#121212",
              paper: "#1e1e1e",
            },
          }),
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: "2.5rem",
        fontWeight: 500,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: "8px",
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#e6e6e6",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#e6e6e6",
              borderWidth: "2px",
            },
          },
          notchedOutline: {
            borderColor: "#e6e6e6",
          },
        },
      },

      MuiDataGrid: {
        styleOverrides: {
          root: {
            borderRadius: "12px",
            "& .MuiDataGrid-columnSeparator": {
              display: "none",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: "700",
              fontSize: "16px",
              color: "#1F2937",
            },
          },
        },
      },
    },
  });

export const getModalStyle = (mode: PaletteMode) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 400, md: 500 },
  bgColor: mode === "dark" ? "#1e1e1e" : "#fff",
  border: "none",
  borderRadius: "12px",
  boxShadow:"0px 1px 3px 0px rgba(0, 0, 0, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)",
  padding: "24px",
  outline: "none",
});
