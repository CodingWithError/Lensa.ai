import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { resumeAPI, jobsAPI } from '../utils/api'
import { FileText, Brain, Briefcase, TrendingUp, ExternalLink, MapPin, Building } from 'lucide-react'

export default function Results() {
  const { user } = useAuth()
  const [resumes, setResumes] = useState([])
  const [selectedResume, setSelectedResume] = useState(null)
  const [matchingJobs, setMatchingJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [jobsLoading, setJobsLoading] = useState(false)

  useEffect(() => {
    fetchResumes()
  }, [])

  const fetchResumes = async () => {
    try {
      const response = await resumeAPI.getAll()
      setResumes(response.data)
      if (response.data.length > 0) {
        setSelectedResume(response.data[0])
        fetchMatchingJobs(response.data[0].id)
      }
    } catch (error) {
      console.error('Error fetching resumes:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchMatchingJobs = async (resumeId) => {
    if (!resumeId) return
    
    setJobsLoading(true)
    try {
      const response = await jobsAPI.getMatching(resumeId)
      setMatchingJobs(response.data || [])
    } catch (error) {
      console.error('Error fetching matching jobs:', error)
    } finally {
      setJobsLoading(false)
    }
  }

  const handleResumeSelect = (resume) => {
    setSelectedResume(resume)
    fetchMatchingJobs(resume.id)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'processing':
        return 'bg-yellow-100 text-yellow-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading results...</p>
        </div>
      </div>
    )
  }

  if (resumes.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Resumes Found</h2>
            <p className="text-gray-600 mb-6">
              You haven't uploaded any resumes yet. Upload a resume to see analysis results.
            </p>
            <a
              href="/dashboard"
              className="btn-primary"
            >
              Go to Dashboard
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Analysis Results</h1>
          <p className="text-gray-600">View your resume analysis and job matches</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Resume Selection */}
          <div className="lg:col-span-1">
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Resumes</h2>
              <div className="space-y-3">
                {resumes.map((resume) => (
                  <button
                    key={resume.id}
                    onClick={() => handleResumeSelect(resume)}
                    className={`w-full text-left p-4 rounded-lg border transition-colors ${
                      selectedResume?.id === resume.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-primary-600" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">
                          {resume.filename}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(resume.uploaded_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(resume.analysis_status)}`}>
                        {resume.analysis_status}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Content */}
          <div className="lg:col-span-2">
            {selectedResume ? (
              <div className="space-y-6">
                {/* Resume Analysis Results */}
                {selectedResume.analysis_status === 'completed' && (
                  <div className="card">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills Analysis</h2>
                    
                    {/* Technical Skills */}
                    {selectedResume.technical_skills && selectedResume.technical_skills.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                          <Brain className="w-5 h-5 text-blue-600 mr-2" />
                          Technical Skills
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedResume.technical_skills.map((skill, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Soft Skills */}
                    {selectedResume.soft_skills && selectedResume.soft_skills.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                          <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
                          Soft Skills
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedResume.soft_skills.map((skill, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Experience & Job Titles */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-3">Experience</h3>
                        <p className="text-2xl font-bold text-primary-600">
                          {selectedResume.experience_years || 0} years
                        </p>
                      </div>
                      
                      {selectedResume.job_titles && selectedResume.job_titles.length > 0 && (
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-3">Job Titles</h3>
                          <div className="space-y-2">
                            {selectedResume.job_titles.map((title, index) => (
                              <p key={index} className="text-gray-700">{title}</p>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Job Matches */}
                <div className="card">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Matching Jobs</h2>
                  
                  {jobsLoading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
                      <p className="mt-2 text-gray-600">Finding matching jobs...</p>
                    </div>
                  ) : matchingJobs.length > 0 ? (
                    <div className="space-y-4">
                      {matchingJobs.map((job, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                {job.title}
                              </h3>
                              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                                <div className="flex items-center space-x-1">
                                  <Building className="w-4 h-4" />
                                  <span>{job.company}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <MapPin className="w-4 h-4" />
                                  <span>{job.location}</span>
                                </div>
                              </div>
                              {job.salary && (
                                <p className="text-sm text-gray-600 mb-3">
                                  💰 {job.salary}
                                </p>
                              )}
                              <p className="text-gray-700 text-sm line-clamp-3">
                                {job.description}
                              </p>
                              {job.match_score && (
                                <div className="mt-3">
                                  <span className="px-2 py-1 bg-primary-100 text-primary-800 rounded-full text-xs font-medium">
                                    Match Score: {job.match_score}
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              <a
                                href={job.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-outline inline-flex items-center space-x-2"
                              >
                                <span>View Job</span>
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">No matching jobs found</p>
                      <p className="text-sm text-gray-500">Try adjusting your search criteria</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="card text-center py-12">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Resume</h3>
                <p className="text-gray-600">Choose a resume from the left to view analysis results</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
