import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Routes from './routes'
import { AuthProvider } from './hooks/useAuth'

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes />
        <ToastContainer />
      </AuthProvider>
    </BrowserRouter>
  )
}

  export default App
