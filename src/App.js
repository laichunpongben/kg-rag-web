// src/App.js
import React from 'react';
import { ThemeProvider, CssBaseline, Container } from '@mui/material';
import { HelmetProvider } from 'react-helmet-async';
import Page from './components/Page';
import { theme } from './theme';

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }} maxWidth="lg">
          <Page />
        </Container>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
