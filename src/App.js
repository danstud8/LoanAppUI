import './App.css';
import { useState } from 'react';
import AuthProvider from './auth/AuthProvider';
import Routes from './routes'



function App() {

  const [loggedIn, setLoggedIn] = useState(true);

  return (
    <AuthProvider>
      <div>Salut !</div>
       <Routes/>
    </AuthProvider>
  )
    
}

export default App;
