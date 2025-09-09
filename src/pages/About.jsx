import { Link } from 'react-router-dom'
import { Brain, Users, Shield, Zap, ArrowRight, Target, Rocket, Globe, Award, TrendingUp } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

export default function About() {
  const { user } = useAuth()
  
  const features = [
    {
      icon: <Brain className="w-6 h-6 text-primary-500" />,
      title: "AI-Powered Analysis",
      description: "Our advanced AI algorithms analyze resumes with unprecedented accuracy, extracting skills, experience, and insights that traditional methods might miss."
    },
    {
      icon: <Users className="w-6 h-6 text-primary-500" />,
      title: "Smart Job Matching",
      description: "We connect you with job opportunities that truly match your skills and experience, using sophisticated matching algorithms and real-time market data."
    },
    {
      icon: <Shield className="w-6 h-6 text-primary-500" />,
      title: "Privacy & Security",
      description: "Your data is protected with enterprise-grade security. We never share your personal information and ensure complete privacy throughout the process."
    },
    {
      icon: <Zap className="w-6 h-6 text-primary-500" />,
      title: "Lightning Fast",
      description: "Get results in minutes, not hours. Our optimized systems process resumes quickly while maintaining the highest quality analysis."
    }
  ]

  const team = [
    {
      name: "Dr. Sarah Chen",
      role: "Chief AI Officer",
      bio: "PhD in Machine Learning from Stanford, 10+ years in AI research and development.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face&auto=format"
    },
    {
      name: "Michael Rodriguez",
      role: "Head of Product",
      bio: "Former product leader at LinkedIn and Google, passionate about career development technology.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face&auto=format"
    },
    {
      name: "Emily Watson",
      role: "Lead Data Scientist",
      bio: "Expert in NLP and resume parsing, specializing in extracting meaningful insights from unstructured data.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face&auto=format"
    },
    {
      name: "David Lee",
      role: "Senior Software Engineer",
      bio: "Full-stack developer with expertise in React, Node.js, and AI integration.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face&auto=format"
    }
  ]

  const stats = [
    { number: "50,000+", label: "Resumes Analyzed", icon: <Target className="w-8 h-8 text-primary-500" /> },
    { number: "95%", label: "Accuracy Rate", icon: <Award className="w-8 h-8 text-primary-500" /> },
    { number: "10,000+", label: "Jobs Matched", icon: <TrendingUp className="w-8 h-8 text-primary-500" /> },
    { number: "24/7", label: "AI Processing", icon: <Rocket className="w-8 h-8 text-primary-500" /> }
  ]

  const technologies = [
    {
      icon: <Brain className="w-8 h-8 text-primary-500" />,
      title: "Natural Language Processing",
      description: "Advanced NLP algorithms that understand context, extract meaning, and identify patterns in resume content with human-like comprehension."
    },
    {
      icon: <Zap className="w-8 h-8 text-primary-500" />,
      title: "Machine Learning",
      description: "Continuously improving models that learn from millions of resumes and job postings to provide increasingly accurate matches and insights."
    },
    {
      icon: <Globe className="w-8 h-8 text-primary-500" />,
      title: "Real-time Processing",
      description: "Lightning-fast analysis that processes resumes in seconds while maintaining the highest standards of accuracy and reliability."
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-100 mb-8 font-orbitron">
              About <span className="text-primary-500">Lensa.ai</span>
            </h1>
            <p className="text-xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              We're revolutionizing how people approach their careers by combining cutting-edge AI technology 
              with deep understanding of the job market. Our mission is to make career success accessible to everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to={user ? "/dashboard" : "/register"}
                className="btn-primary text-lg px-10 py-4 inline-flex items-center space-x-3"
              >
                <span>{user ? "Go to Dashboard" : "Get Started Today"}</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/"
                className="btn-outline text-lg px-10 py-4"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-black/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-8 font-orbitron">
                Our <span className="text-primary-500">Mission</span>
              </h2>
              <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                At Lensa.ai, we believe that everyone deserves access to the tools and insights needed 
                to build a successful career. Traditional resume analysis and job matching often rely on 
                outdated methods that don't capture the full picture of a candidate's potential.
              </p>
              <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                We're changing that by leveraging the power of artificial intelligence to provide 
                accurate, comprehensive, and actionable career insights. Our platform doesn't just 
                analyze resumes – it understands careers.
              </p>
              <p className="text-xl text-gray-300 leading-relaxed">
                Whether you're a recent graduate, a mid-career professional looking to pivot, 
                or an experienced executive seeking new opportunities, Lensa.ai provides the insights 
                and connections you need to succeed.
              </p>
            </div>
            <div className="relative">
              <div className="card bg-gradient-to-br from-primary-500/10 to-primary-500/5 border-primary-500/30">
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary-500/40">
                    <Brain className="w-10 h-10 text-primary-500" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-100 mb-4 font-orbitron">
                    AI-Powered Career Intelligence
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Our AI systems continuously learn and improve, ensuring you get the most accurate 
                    and up-to-date career insights available.
                  </p>
                </div>
              </div>
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
              We combine cutting-edge technology with human expertise to deliver results that matter.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {features.map((feature, index) => (
              <div key={index} className="card hover:scale-105 transition-all duration-300">
                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 bg-primary-500/10 rounded-2xl flex items-center justify-center border border-primary-500/20 flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-100 mb-4 font-orbitron">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-black/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-8 font-orbitron">
              Our Impact in <span className="text-primary-500">Numbers</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              See how we're transforming careers across the globe
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary-500/30">
                  {stat.icon}
                </div>
                <div className="text-4xl md:text-5xl font-bold text-gray-100 mb-3 font-orbitron">
                  {stat.number}
                </div>
                <div className="text-gray-300 text-lg">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-black/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-6 font-orbitron">
              Meet Our <span className="text-primary-500">Team</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              The brilliant minds behind Lensa.ai's innovative technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {team.map((member, index) => (
              <div key={index} className="card text-center hover:scale-105 transition-all duration-300">
                <div className="w-28 h-28 rounded-2xl mx-auto mb-6 overflow-hidden border-2 border-primary-500/30 shadow-lg">
                  <img 
                    src={member.image} 
                    alt={`${member.name} - ${member.role}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to initials if image fails to load
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'flex'
                    }}
                  />
                  <div 
                    className="w-full h-full bg-primary-500/20 flex items-center justify-center hidden"
                    style={{ display: 'none' }}
                  >
                    <span className="text-2xl font-bold text-primary-500 font-orbitron">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-100 mb-3 font-orbitron">
                  {member.name}
                </h3>
                <p className="text-primary-500 font-medium mb-4">
                  {member.role}
                </p>
                <p className="text-gray-300 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-6 font-orbitron">
              Powered by <span className="text-primary-500">Advanced Technology</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We leverage the latest advancements in AI and machine learning to deliver exceptional results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {technologies.map((tech, index) => (
              <div key={index} className="card text-center hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-primary-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary-500/20">
                  {tech.icon}
                </div>
                <h3 className="text-2xl font-semibold text-gray-100 mb-4 font-orbitron">{tech.title}</h3>
                <p className="text-gray-300 leading-relaxed">
                  {tech.description}
                </p>
              </div>
            ))}
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
            Join thousands of professionals who have already discovered the power of AI-driven career insights
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
              to="/"
              className="btn-outline text-lg px-10 py-4"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
