import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Eye, EyeOff, AlertCircle } from 'lucide-react'

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const { login, user } = useAuth()
  const navigate = useNavigate()

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard')
    }
  }, [user, navigate])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await login(formData.email, formData.password)
      console.log('Login result:', result) // Debug log
      if (result.success) {
        navigate('/dashboard')
      } else {
        console.log('Login error:', result.error) // Debug log
        setError(result.error || 'Login failed')
      }
    } catch (err) {
      console.error('Login exception:', err) // Debug log
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center">
            <span className="text-space-950 font-bold text-2xl font-orbitron">L</span>
          </div>
        </div>
        <h2 className="mt-8 text-center text-4xl font-bold text-gray-100 font-orbitron">
          Sign in to your <span className="text-primary-500">account</span>
        </h2>
        <p className="mt-4 text-center text-lg text-gray-300">
          Or{' '}
          <Link
            to="/register"
            className="font-medium text-primary-500 hover:text-primary-400 transition-colors"
          >
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-12 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="card">
          <form className="space-y-8" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="input-field"
                placeholder="Enter your email"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center space-x-3 text-red-400 bg-red-500/10 border border-red-500/30 p-4 rounded-xl">
                <AlertCircle className="w-5 h-5" />
                <span className="text-sm">{String(error)}</span>
              </div>
            )}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed py-4 text-lg"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>

            {/* Forgot Password */}
            <div className="text-center">
              <a
                href="#"
                className="text-sm text-primary-500 hover:text-primary-400 transition-colors"
              >
                Forgot your password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
