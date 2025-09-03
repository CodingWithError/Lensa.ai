import { Link } from 'react-router-dom'
import { Upload, Brain, Briefcase, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

export default function Home() {
  const { user } = useAuth()
  
  const features = [
    {
      icon: <Brain className="w-6 h-6 text-primary-500" />,
      title: "AI-Powered Analysis",
      description: "Advanced AI algorithms analyze your resume and extract key skills, experience, and insights."
    },
    {
      icon: <Briefcase className="w-6 h-6 text-primary-500" />,
      title: "Smart Job Matching",
      description: "Find the perfect job opportunities that match your skills and experience level."
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-primary-500" />,
      title: "Career Growth",
      description: "Get personalized recommendations to advance your career and develop new skills."
    }
  ]

  const benefits = [
    "Extract skills from any resume format (PDF, DOCX)",
    "AI-powered job recommendations",
    "Skills gap analysis and development suggestions",
    "Industry insights and salary data",
    "Professional resume optimization tips",
    "Real-time job market trends"
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-100 mb-8 font-orbitron">
              AI-Powered Resume
              <span className="text-primary-500"> Analysis</span>
            </h1>
            <p className="text-xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Upload your resume and let our AI analyze your skills, experience, and potential. 
              Get matched with the perfect job opportunities and accelerate your career growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to={user ? "/dashboard" : "/register"}
                className="btn-primary text-lg px-10 py-4 inline-flex items-center space-x-3"
              >
                <span>{user ? "Go to Dashboard" : "Get Started Free"}</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/about"
                className="btn-outline text-lg px-10 py-4"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-6 font-orbitron">
              Why Choose <span className="text-primary-500">Lensa.ai</span>?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Our platform combines cutting-edge AI technology with industry expertise 
              to provide you with the most accurate and actionable career insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <div key={index} className="card text-center hover:scale-105 transition-all duration-300">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-primary-500/10 rounded-2xl flex items-center justify-center border border-primary-500/20">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-gray-100 mb-4 font-orbitron">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-black/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-6 font-orbitron">
              How It <span className="text-primary-500">Works</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Get started in just three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-space-950 text-3xl font-bold font-orbitron">1</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-100 mb-4 font-orbitron">Upload Resume</h3>
              <p className="text-gray-300 leading-relaxed">
                Upload your resume in PDF, DOCX, or DOC format. Our system supports all major file types.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-space-950 text-3xl font-bold font-orbitron">2</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-100 mb-4 font-orbitron">AI Analysis</h3>
              <p className="text-gray-300 leading-relaxed">
                Our AI analyzes your resume, extracts skills, experience, and provides detailed insights.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-space-950 text-3xl font-bold font-orbitron">3</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-100 mb-4 font-orbitron">Get Results</h3>
              <p className="text-gray-300 leading-relaxed">
                Receive job recommendations, skills analysis, and career development suggestions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-8 font-orbitron">
                Everything You Need for <span className="text-primary-500">Career Success</span>
              </h2>
              <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                Our comprehensive platform provides all the tools and insights you need 
                to take your career to the next level.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <CheckCircle className="w-6 h-6 text-primary-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 leading-relaxed">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="card bg-gradient-to-br from-primary-500/10 to-primary-500/5 border-primary-500/30">
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary-500/40">
                    <Upload className="w-10 h-10 text-primary-500" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-100 mb-4 font-orbitron">
                    Ready to Get Started?
                  </h3>
                  <p className="text-gray-300 mb-8 leading-relaxed">
                    Join thousands of professionals who have already transformed their careers with Lensa.ai
                  </p>
                  <Link
                    to={user ? "/dashboard" : "/register"}
                    className="btn-primary inline-flex items-center space-x-3"
                  >
                    <span>{user ? "Go to Dashboard" : "Start Free Analysis"}</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-black/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-8 font-orbitron">
            Ready to Transform Your <span className="text-primary-500">Career</span>?
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join Lensa.ai today and discover how AI can help you find the perfect job 
            and advance your career to new heights.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to={user ? "/dashboard" : "/register"}
              className="btn-primary text-lg px-10 py-4 inline-flex items-center space-x-3"
            >
              <span>{user ? "Go to Dashboard" : "Get Started Free"}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            {!user && (
              <Link
                to="/login"
                className="btn-outline text-lg px-10 py-4"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
