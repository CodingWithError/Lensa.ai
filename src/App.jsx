import { Routes, Route } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SpaceBackground from './components/SpaceBackground'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Results from './pages/Results'
import About from './pages/About'

function App() {
  const { user, loading } = useAuth()

  console.log('App component rendered, user:', user, 'loading:', loading)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center space-bg relative">
        <SpaceBackground />
        <div className="text-center relative z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto neon-glow"></div>
          <p className="mt-4 text-gray-300">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col space-bg relative">
      <SpaceBackground />
      <Navbar />
      <main className="flex-1 relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/login" 
            element={user ? <Dashboard /> : <Login />} 
          />
          <Route 
            path="/register" 
            element={user ? <Dashboard /> : <Register />} 
          />
          <Route path="/about" element={<About />} />
          
          {/* Protected routes */}
          <Route 
            path="/dashboard" 
            element={user ? <Dashboard /> : <Login />} 
          />
          <Route 
            path="/profile" 
            element={user ? <Profile /> : <Login />} 
          />
          <Route 
            path="/results" 
            element={user ? <Results /> : <Login />} 
          />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
