import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Menu, X, User, LogOut, Settings, Briefcase, Home, Info, BarChart3 } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
    setIsMenuOpen(false)
  }

  return (
    <nav className="glass-panel border-b border-space-700/50 sticky top-0 z-50 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 neon-glow group-hover:scale-105">
              <span className="text-space-950 font-bold text-xl font-orbitron">L</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-100 font-orbitron">Lensa.ai</span>
              <span className="text-xs text-primary-400 font-medium">AI Career Intelligence</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link 
              to="/" 
              className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-primary-400 hover:bg-primary-500/10 rounded-lg transition-all duration-200 border border-transparent hover:border-primary-500/30"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <Link 
              to="/about" 
              className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-primary-400 hover:bg-primary-500/10 rounded-lg transition-all duration-200 border border-transparent hover:border-primary-500/30"
            >
              <Info className="w-4 h-4" />
              <span>About</span>
            </Link>
            {user && (
              <>
                <Link 
                  to="/dashboard" 
                  className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-primary-400 hover:bg-primary-500/10 rounded-lg transition-all duration-200 border border-transparent hover:border-primary-500/30"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>
                <Link 
                  to="/results" 
                  className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-primary-400 hover:bg-primary-500/10 rounded-lg transition-all duration-200 border border-transparent hover:border-primary-500/30"
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Results</span>
                </Link>
              </>
            )}
          </div>

          {/* Right side - Auth */}
          <div className="flex items-center space-x-4">
            {/* Auth Buttons */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center space-x-3 p-2 rounded-xl hover:bg-primary-500/10 transition-all duration-200 border border-space-600/50 hover:border-primary-500/50 backdrop-blur-sm"
                >
                  <div className="w-8 h-8 bg-primary-500/20 rounded-full flex items-center justify-center border border-primary-500/30">
                    <User className="w-4 h-4 text-primary-400" />
                  </div>
                  <span className="text-gray-200 font-medium">{user.username}</span>
                  <div className="w-2 h-2 bg-primary-500 rounded-full neon-glow"></div>
                </button>

                {/* Dropdown Menu */}
                {isMenuOpen && (
                  <div className="absolute right-0 mt-3 w-56 glass-panel border border-space-700/50 py-3 z-50">
                    <div className="px-4 py-3 border-b border-space-700/50">
                      <p className="text-sm text-gray-400">Signed in as</p>
                      <p className="text-gray-200 font-medium">{user.email}</p>
                    </div>
                    <Link
                      to="/profile"
                      className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-primary-500/10 hover:text-primary-400 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      <span>Profile</span>
                    </Link>
                    <Link
                      to="/dashboard"
                      className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-primary-500/10 hover:text-primary-400 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Settings className="w-4 h-4" />
                      <span>Dashboard</span>
                    </Link>
                    <hr className="my-2 border-space-700/50" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors w-full text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-primary-400 font-medium transition-colors px-4 py-2 rounded-lg hover:bg-primary-500/10 border border-transparent hover:border-primary-500/30"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="btn-primary"
                >
                  Get Started Free
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-primary-500/10 transition-colors border border-space-600/50 hover:border-primary-500/50"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-gray-300" />
              ) : (
                <Menu className="w-5 h-5 text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-space-700/50 glass-panel rounded-b-xl">
            <div className="flex flex-col space-y-4 px-4">
              <Link
                to="/"
                className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-primary-500/10 hover:text-primary-400 transition-all duration-200 rounded-lg border border-transparent hover:border-primary-500/30"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link>
              <Link
                to="/about"
                className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-primary-500/10 hover:text-primary-400 transition-all duration-200 rounded-lg border border-transparent hover:border-primary-500/30"
                onClick={() => setIsMenuOpen(false)}
              >
                <Info className="w-4 h-4" />
                <span>About</span>
              </Link>
              {user && (
                <>
                  <Link
                    to="/dashboard"
                    className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-primary-500/10 hover:text-primary-400 transition-all duration-200 rounded-lg border border-transparent hover:border-primary-500/30"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <BarChart3 className="w-4 h-4" />
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    to="/results"
                    className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-primary-500/10 hover:text-primary-400 transition-all duration-200 rounded-lg border border-transparent hover:border-primary-500/30"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Briefcase className="w-4 h-4" />
                    <span>Results</span>
                  </Link>
                  <Link
                    to="/profile"
                    className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-primary-500/10 hover:text-primary-400 transition-all duration-200 rounded-lg border border-transparent hover:border-primary-500/30"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200 rounded-lg text-left border border-transparent hover:border-red-500/30"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
