import { StoreProvider } from 'easy-peasy';
import store from './store';
import AppRouter from './AppRouter';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'; // For MUI base styles

const theme = createTheme(); // Basic MUI theme

function App() {
  return (
    <StoreProvider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* MUI's CSS reset, good to have */}
        <AppRouter />
      </ThemeProvider>
    </StoreProvider>
  );
}

export default App;