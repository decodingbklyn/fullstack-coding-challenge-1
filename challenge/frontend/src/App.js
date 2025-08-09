import React, {useState} from 'react';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import theme from './theme';
import CouncilDashboard from './scenes/Dashboards/CouncilDashboard';
import Login from './scenes/Login/Login';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {!token ? <Login onLogin={setToken} /> : <CouncilDashboard  onLogout={handleLogout}/>}
    </ThemeProvider>
  );
}

export default App;
