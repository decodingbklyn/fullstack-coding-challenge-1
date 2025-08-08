import React from 'react';
import logo from './logo.svg';
import './App.css';
import CouncilDashboard from './components/Dashboards/CouncilDashboard';
function App() {
  return (
    <div className="App">
        <CouncilDashboard districtId={1} />
    </div>
  );
}

export default App;
