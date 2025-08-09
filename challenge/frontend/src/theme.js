import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#003366', // NYC blue
    },
    secondary: {
      main: '#FFD100', // NYC yellow
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h5: {
      fontWeight: 700,
    },
  },
});

export default theme;