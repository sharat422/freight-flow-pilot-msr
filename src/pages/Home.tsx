import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Menu, Phone, Mail, ArrowRight, Users, User, Truck, Package, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const services = [
    {
      title: "Load Management",
      description: "Efficient load tracking and management with real-time updates",
      icon: Package
    },
    {
      title: "Driver Coordination", 
      description: "Seamless driver management and communication tools",
      icon: Truck
    },
    {
      title: "Route Optimization",
      description: "Smart routing algorithms to maximize efficiency and reduce costs",
      icon: MapPin
    },
    {
      title: "Real-time Tracking",
      description: "Live GPS tracking and delivery status updates",
      icon: Clock
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "Swift Logistics",
      text: "MSR has revolutionized our dispatch operations. The efficiency gains are remarkable."
    },
    {
      name: "Mike Rodriguez", 
      company: "TransCorp",
      text: "Best dispatching platform we've used. Customer support is outstanding."
    },
    {
      name: "Emily Chen",
      company: "Freight Masters",
      text: "The real-time tracking and automated reporting save us hours every day."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">MSR</span>
              </div>
              <span className="ml-3 text-xl font-bold">MSR Freight Dispatchers</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#services" className="text-gray-300 hover:text-white transition-colors">Services</a>
                <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
                <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors">Testimonials</a>
                <a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a>
                <Link to="/login">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                    Login
                  </Button>
                </Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-800 border-t border-gray-700 animate-slide-up">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#services" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors">Services</a>
              <a href="#about" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors">About</a>
              <a href="#testimonials" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors">Testimonials</a>
              <a href="#contact" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors">Contact</a>
              <Link to="/login" className="block px-3 py-2">
                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section with Truck Background */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
            alt="Trucks on highway"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-gray-900/90"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Professional Freight Dispatching
              <span className="block text-primary">Made Simple</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Streamline your logistics operations with our comprehensive dispatching platform. 
              Real-time tracking, automated routing, and seamless communication in one powerful solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/login">
                <Button size="lg" className="button-glow bg-gradient-primary hover:shadow-lg px-8 py-3 text-lg">
                  Get Started Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-3 text-lg">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 border-y border-gray-800 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-8">Trusted by 500+ logistics companies</p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="text-2xl font-bold text-gray-500">SWIFT LOGISTICS</div>
              <div className="text-2xl font-bold text-gray-500">TRANSCORP</div>
              <div className="text-2xl font-bold text-gray-500">FREIGHT MASTERS</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section with Background */}
      <section id="services" className="relative py-20 px-4 sm:px-6 lg:px-8">
        {/* Background Image for Services */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80" 
            alt="Freight trucks in warehouse"
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Complete Dispatching Solution</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need to manage your freight operations efficiently and profitably
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div key={index} className="group glass-effect p-6 rounded-xl card-hover">
                  <IconComponent className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section with Truck Image */}
      <section id="about" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gray-800/30">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
            alt="Truck driver and logistics"
            className="w-full h-full object-cover opacity-15"
          />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose MSR Freight Dispatchers?</h2>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                With over a decade of experience in the logistics industry, MSR Freight Dispatchers 
                provides cutting-edge technology solutions that streamline operations and maximize profitability.
              </p>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  24/7 dispatch support and monitoring
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  Advanced route optimization algorithms
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  Real-time load tracking and updates
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  Comprehensive reporting and analytics
                </li>
              </ul>
            </div>
            <div className="glass-effect p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4 text-primary">Industry Stats</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">500+</div>
                  <div className="text-gray-400">Active Carriers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">50k+</div>
                  <div className="text-gray-400">Loads Dispatched</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">99.9%</div>
                  <div className="text-gray-400">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">24/7</div>
                  <div className="text-gray-400">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-400">Join hundreds of satisfied logistics professionals</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="glass-effect p-6 rounded-xl">
                <p className="text-gray-300 mb-4 italic">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center mr-3">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-20 px-4 sm:px-6 lg:px-8">
        {/* Background Image for Contact */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
            alt="Logistics center"
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-gray-400">
              Contact us today to learn how MSR can transform your dispatching operations
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-primary mr-3" />
                  <span className="text-gray-300">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-primary mr-3" />
                  <span className="text-gray-300">info@msrfreight.com</span>
                </div>
              </div>
            </div>
            
            <div className="glass-effect p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Send us a message</h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-primary focus:outline-none text-white"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-primary focus:outline-none text-white"
                />
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-primary focus:outline-none text-white resize-none"
                ></textarea>
                <Button className="w-full button-glow bg-gradient-primary hover:shadow-lg">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center mr-2">
                  <span className="text-white font-bold">MSR</span>
                </div>
                <span className="font-bold">MSR Freight Dispatchers</span>
              </div>
              <p className="text-gray-400 text-sm">
                Professional freight dispatching solutions for modern logistics companies.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Load Management</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Driver Coordination</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Route Optimization</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Real-time Tracking</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 MSR Freight Dispatchers. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
