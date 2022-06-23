import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Routes from './routes'
import { AuthProvider } from './hooks/useAuth'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </BrowserRouter>
  )
}

  export default App
