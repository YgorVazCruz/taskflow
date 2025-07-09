import { useState } from 'react';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  return authenticated ? (
    <Home logout={() => setAuthenticated(false)} />
  ) : (
    <Login onLogin={() => setAuthenticated(true)} />
  );
}

export default App;
