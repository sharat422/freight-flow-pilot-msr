
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { LoginForm } from '@/components/auth/LoginForm';

export default function Login() {
  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Navigation */}
      <nav className="absolute top-0 w-full z-50 p-6">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <Link to="/" className="flex items-center group">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center mr-3 group-hover:shadow-lg transition-all">
              <span className="text-white font-bold text-lg">MSR</span>
            </div>
            <span className="text-xl font-bold group-hover:text-primary transition-colors">MSR Freight Dispatchers</span>
          </Link>
          <Link to="/" className="text-gray-300 hover:text-white transition-colors flex items-center">
            <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
            Back to Home
          </Link>
        </div>
      </nav>

      <div className="flex items-center justify-center min-h-screen p-4 relative z-10">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center space-y-6 animate-fade-in">
            <div className="space-y-3">
              <h1 className="text-3xl font-bold">
                Welcome Back
              </h1>
              <p className="text-gray-400 text-lg">
                Sign in to access your MSR dispatching dashboard
              </p>
            </div>
          </div>

          {/* Login Form */}
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <LoginForm />
          </div>

          {/* Footer Links */}
          <div className="text-center space-y-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="text-sm text-gray-400">
              Don't have an account?{' '}
              <a href="#" className="text-primary hover:text-primary/80 transition-colors">
                Contact us for access
              </a>
            </div>
            <div className="text-sm text-gray-500">
              <a href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
              {' • '}
              <a href="#" className="hover:text-gray-400 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
