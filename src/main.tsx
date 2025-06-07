import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider, CssBaseline } from "@mui/material"
import { getDesignTokens } from './theme.ts'

createRoot(document.getElementById('root') as HTMLElement ).render(
  <StrictMode>
    <ThemeProvider theme={getDesignTokens("light")}>
      <CssBaseline/>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
