import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { userAPI, resumeAPI } from '../utils/api'
import { Upload, FileText, TrendingUp, Briefcase, User, Clock, CheckCircle } from 'lucide-react'
import FileUpload from '../components/FileUpload'

export default function Dashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState(null)
  const [resumes, setResumes] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [statsData, resumesData] = await Promise.all([
        userAPI.getStats(),
        userAPI.getResumesSummary()
      ])
      
      setStats(statsData.data)
      setResumes(resumesData.data.resumes || [])
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFileSelect = (file) => {
    setSelectedFile(file)
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    setUploading(true)
    try {
      const response = await resumeAPI.upload(selectedFile)
      setResumes([...resumes, response.data])
      setSelectedFile(null)
      fetchDashboardData() // Refresh stats
    } catch (error) {
      console.error('Error uploading file:', error)
    } finally {
      setUploading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto neon-glow"></div>
          <p className="mt-4 text-gray-300">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-100 font-orbitron mb-2">Dashboard</h1>
          <p className="text-xl text-gray-300">Welcome back, <span className="text-primary-500">{user?.full_name || user?.username}</span>!</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary-500/10 rounded-xl flex items-center justify-center border border-primary-500/20">
                <FileText className="w-6 h-6 text-primary-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Total Resumes</p>
                <p className="text-3xl font-bold text-gray-100 font-orbitron">{stats?.total_resumes || 0}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary-500/10 rounded-xl flex items-center justify-center border border-primary-500/20">
                <CheckCircle className="w-6 h-6 text-primary-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Completed Analyses</p>
                <p className="text-3xl font-bold text-gray-100 font-orbitron">{stats?.completed_analyses || 0}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-secondary-500/10 rounded-xl flex items-center justify-center border border-secondary-500/20">
                <TrendingUp className="w-6 h-6 text-secondary-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Total Skills</p>
                <p className="text-3xl font-bold text-gray-100 font-orbitron">{stats?.total_skills || 0}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-neon-teal/10 rounded-xl flex items-center justify-center border border-neon-teal/20">
                <Clock className="w-6 h-6 text-neon-teal" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Experience</p>
                <p className="text-3xl font-bold text-gray-100 font-orbitron">{stats?.experience_years || 0} years</p>
              </div>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <div className="card mb-12">
          <h2 className="text-2xl font-semibold text-gray-100 mb-6 font-orbitron">Upload New Resume</h2>
          <div className="mb-6">
            <FileUpload onFileSelect={handleFileSelect} />
          </div>
          {selectedFile && (
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="btn-primary disabled:opacity-50"
            >
              {uploading ? 'Uploading...' : 'Upload Resume'}
            </button>
          )}
        </div>

        {/* Recent Resumes */}
        <div className="card">
          <h2 className="text-2xl font-semibold text-gray-100 mb-6 font-orbitron">Recent Resumes</h2>
          {resumes.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-800/50 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-gray-700/50">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-300 text-lg mb-2">No resumes uploaded yet</p>
              <p className="text-gray-400">Upload your first resume to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {resumes.slice(0, 5).map((resume) => (
                <div key={resume.id} className="flex items-center justify-between p-6 border border-space-700/50 rounded-xl bg-space-800/30 backdrop-blur-sm hover:bg-space-800/50 transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary-500/10 rounded-xl flex items-center justify-center border border-primary-500/20">
                      <FileText className="w-6 h-6 text-primary-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-100 text-lg">{resume.filename}</p>
                      <p className="text-sm text-gray-400">
                        Uploaded {new Date(resume.uploaded_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      resume.analysis_status === 'completed' 
                        ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                        : resume.analysis_status === 'processing'
                        ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                        : resume.analysis_status === 'failed'
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                    }`}>
                      {resume.analysis_status}
                    </span>
                    {resume.analysis_status === 'completed' && (
                      <span className="text-sm text-gray-300">
                        {resume.technical_skills_count + resume.soft_skills_count} skills found
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="card text-center hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="w-16 h-16 bg-primary-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary-500/20">
              <Briefcase className="w-8 h-8 text-primary-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-100 mb-3 font-orbitron">Find Jobs</h3>
            <p className="text-gray-300 leading-relaxed">Discover job opportunities that match your skills</p>
          </div>

          <div className="card text-center hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="w-16 h-16 bg-secondary-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-secondary-500/20">
              <TrendingUp className="w-8 h-8 text-secondary-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-100 mb-3 font-orbitron">Career Insights</h3>
            <p className="text-gray-300 leading-relaxed">Get personalized career development recommendations</p>
          </div>

          <div className="card text-center hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="w-16 h-16 bg-neon-teal/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-neon-teal/20">
              <User className="w-8 h-8 text-neon-teal" />
            </div>
            <h3 className="text-xl font-semibold text-gray-100 mb-3 font-orbitron">Update Profile</h3>
            <p className="text-gray-300 leading-relaxed">Keep your profile and preferences up to date</p>
          </div>
        </div>
      </div>
    </div>
  )
}
