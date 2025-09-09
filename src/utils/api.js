import axios from 'axios'

// Create axios instance
export const api = axios.create({
  baseURL: '/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// API functions
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getProfile: () => api.get('/auth/me'),
  updateProfile: (profileData) => api.put('/auth/me', profileData),
}

export const resumeAPI = {
  upload: (file) => {
    const formData = new FormData()
    formData.append('file', file)
    return api.post('/resume/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  analyze: (resumeId) => api.post(`/resume/${resumeId}/analyze`),
  getAll: () => api.get('/resume/'),
  getById: (id) => api.get(`/resume/${id}`),
  delete: (id) => api.delete(`/resume/${id}`),
  getSkills: (id) => api.get(`/resume/${id}/skills`),
}

export const jobsAPI = {
  search: (keywords, location = '', limit = 20) => 
    api.get('/jobs/search', { params: { keywords, location, limit } }),
  getMatching: (resumeId, location = '', limit = 20) => 
    api.get('/jobs/matching', { params: { resume_id: resumeId, location, limit } }),
  getDetails: (jobId, source) => 
    api.get(`/jobs/${jobId}/details`, { params: { source } }),
  getCategories: () => api.get('/jobs/categories'),
  getRecommendations: (resumeId) => 
    api.get('/jobs/recommendations', { params: { resume_id: resumeId } }),
  getTrending: (location = '') => 
    api.get('/jobs/trending', { params: { location } }),
}

export const userAPI = {
  getProfile: () => api.get('/user/profile'),
  updateProfile: (profileData) => api.put('/user/profile', profileData),
  getStats: () => api.get('/user/stats'),
  getResumesSummary: () => api.get('/user/resumes/summary'),
  changePassword: (currentPassword, newPassword) => 
    api.post('/user/change-password', { current_password: currentPassword, new_password: newPassword }),
  deleteAccount: () => api.delete('/user/account'),
}
