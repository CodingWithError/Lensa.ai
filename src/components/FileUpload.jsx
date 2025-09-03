import { useState, useRef } from 'react'
import { Upload, File, X, CheckCircle, AlertCircle } from 'lucide-react'

export default function FileUpload({ onFileSelect, acceptedTypes = ['.pdf', '.docx', '.doc'], maxSize = 10 }) {
  const [dragActive, setDragActive] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFile = (file) => {
    setError('')
    
    // Check file type
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase()
    if (!acceptedTypes.includes(fileExtension)) {
      setError(`File type not supported. Please upload: ${acceptedTypes.join(', ')}`)
      return
    }
    
    // Check file size (MB)
    const fileSizeMB = file.size / (1024 * 1024)
    if (fileSizeMB > maxSize) {
      setError(`File size too large. Maximum size: ${maxSize}MB`)
      return
    }
    
    setSelectedFile(file)
    onFileSelect(file)
  }

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const removeFile = () => {
    setSelectedFile(null)
    setError('')
    onFileSelect(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="w-full">
      {/* File Input */}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept={acceptedTypes.join(',')}
        onChange={handleFileInput}
      />

      {/* Upload Area */}
      {!selectedFile ? (
        <div
          className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
            dragActive 
              ? 'border-primary-500 bg-primary-500/5' 
              : 'border-space-600/50 hover:border-primary-500/50 hover:bg-primary-500/5'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="w-16 h-16 bg-primary-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary-500/20">
            <Upload className="w-8 h-8 text-primary-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-100 mb-3 font-orbitron">
            Upload your resume
          </h3>
          <p className="text-gray-300 mb-6">
            Drag and drop your resume here, or{' '}
            <button
              type="button"
              onClick={openFileDialog}
              className="text-primary-500 hover:text-primary-400 font-medium transition-colors"
            >
              browse files
            </button>
          </p>
          <p className="text-sm text-gray-400">
            Supported formats: {acceptedTypes.join(', ')} • Max size: {maxSize}MB
          </p>
        </div>
      ) : (
        <div className="border border-space-700/50 rounded-xl p-6 bg-space-800/30 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary-500/10 rounded-xl flex items-center justify-center border border-primary-500/20">
                <File className="w-6 h-6 text-primary-500" />
              </div>
              <div>
                <p className="font-semibold text-gray-100 text-lg">{selectedFile.name}</p>
                <p className="text-sm text-gray-400">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-primary-500" />
              <button
                type="button"
                onClick={removeFile}
                className="p-2 hover:bg-red-500/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400 hover:text-red-400" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-3 flex items-center space-x-2 text-red-400 bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
          <AlertCircle className="w-4 h-4" />
          <span className="text-sm">{error}</span>
        </div>
      )}
    </div>
  )
}
