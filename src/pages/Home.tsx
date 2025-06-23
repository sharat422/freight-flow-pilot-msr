import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone, Mail, ArrowRight, CheckCircle, Users, Truck, Package, MapPin, Clock, Star, Play, ChevronDown, TruckIcon, Contact } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Camera } from 'lucide-react';
import axios from 'axios';

type FormData = {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  company: string;
  message: string;
};

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'how-it-works', 'faq', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const services = [
    {
      title: "Load Booking & Rate Negotiation",
      description: "Get access to premium loads from our extensive network of trusted brokers and shippers, with expert negotiation to secure you the highest rates per mile",
      icon: Package,
      features: ["Exclusive broker network", "Rate optimization specialists", "Direct shipper connections", "No forced loads"]
    },
    {
      title: "24/7 Dedicated Dispatch Support", 
      description: "Your personal dispatch team handles all communications, paperwork, and logistics coordination so you can focus on driving and earning",
      icon: Users,
      features: ["Dedicated dispatcher", "24/7 availability", "Complete paperwork handling", "Emergency support"]
    },
    {
      title: "Smart Route Optimization",
      description: "AI-powered route planning that minimizes deadhead miles and maximizes your profitability with fuel-efficient routing",
      icon: MapPin,
      features: ["Zero deadhead routing", "Fuel cost optimization", "Efficient load sequencing", "Real-time traffic updates"]
    },
    {
       title: "Complete Carrier Setup & Compliance",
      description: "Full-service carrier onboarding including authority setup, insurance compliance, and ongoing administrative support",
      icon: Truck,
      features: ["DOT/MC setup assistance", "IFTA reporting", "ELD compliance", "Document management"]
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Onboard Your Fleet",
      description: "Quick setup process to integrate your trucks into our dispatch system (takes less than 24 hours)"
    },
    {
      number: "02", 
      title: "Receive Custom Load Offers",
      description: "Get tailored load matches based on your equipment, preferences, and optimal routes"
    },
    {
      number: "03",
      title: "Real-Time Operations Management",
      description: "Track shipments, communicate with brokers, and manage paperwork through our platform"
    },
    {
      number: "04",
      title: "Grow Your Trucking Business",
      description: "Scale your operations with our data-driven insights and dedicated support team"
    }
  ];

  const partners = [
    "SWIFT LOGISTICS",
    "TRANSCORP", 
    "FREIGHT MASTERS",
    "CARGO SOLUTIONS",
    "LOGISTICS PRO",
    "TRANSPORT PLUS"
  ];

  const faqData = [
    {
      question: "What makes MSR different from other freight dispatch services?",
      answer: "Unlike generic dispatch services, we specialize in high-value freight with an average of 15-20% higher rates. Our team includes former drivers who understand your needs, and we provide 24/7 personalized support with the same dispatcher."
    },
    {
      question: "How quickly can you find loads for my truck?",
      answer: "Most of our operators receive their next load before completing their current delivery. Our average time-to-load is under 2 hours for standard equipment in major freight lanes."
    },
    {
      question: "What's included in your dispatch service?",
      answer: "Our full-service dispatch includes: load booking, rate negotiation, paperwork handling, invoicing, payment follow-up, route optimization, 24/7 support, and compliance management. We're your complete back office."
    },
    {
      question: "Do you work with new owner-operators?",
      answer: "Absolutely! We specialize in helping new operators establish themselves. We provide extra guidance on rate benchmarks, optimal lanes, and business setup - many of our newest operators become top earners within 3-6 months."
    },
    {
      question: "How do you ensure I get the best rates?",
      answer: "Our proprietary rate database shows real-time benchmarks by lane and equipment type. We negotiate based on current market conditions, your specific costs, and our relationships with premium brokers."
    },
    {
      question: "What equipment types do you dispatch?",
      answer: "We dispatch all major equipment types including dry vans (53'), reefers, flatbeds, step decks, stretch trailers, and specialized equipment. Our network includes specialized brokers for each equipment type."
    },
    {
      question: "Can I still use my favorite brokers?",
      answer: "Yes! We'll work with your existing broker relationships while introducing you to our premium network. Many operators find they can get better rates through our negotiated contracts."
    },
    {
      question: "How do you handle payments?",
      answer: "We invoice all brokers immediately upon delivery confirmation and follow up aggressively on payments. We can help set up factoring or quick pay options, and provide weekly settlement reports."
    },
    {
      question: "What geographic areas do you cover?",
      answer: "We cover all 48 contiguous states with strong networks in major freight corridors. Our load planners specialize in keeping you in high-volume lanes with consistent backhauls."
    },
    {
      question: "How do I get started with MSR Dispatch?",
      answer: "Simply contact us for a free consultation. We'll review your equipment, operating areas, and goals to create a customized dispatch plan. Setup takes less than 24 hours in most cases."
    }
  ];

  const [formData, setFormData] = useState<FormData>({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await axios.post('http://localhost:5000/api/messages', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setSubmitStatus({
        success: true,
        message: 'Message sent successfully!'
      });
      setFormData({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        company: '',
        message: ''
      });
    } catch (error) {
      let errorMessage = 'Failed to send message. Please try again.';
      
      if (axios.isAxiosError(error)) {
        if (error.response) {
          errorMessage = error.response.data.message || errorMessage;
        } else if (error.code === 'ECONNABORTED') {
          errorMessage = 'Connection timeout - server not responding';
        } else if (error.code === 'ERR_NETWORK') {
          errorMessage = 'Cannot connect to server - make sure backend is running';
        }
      }

      setSubmitStatus({
        success: false,
        message: errorMessage
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">MSR</span>
              </div>
              <span className="ml-3 text-xl font-bold text-foreground">MSR Freight Dispatchers</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {[
                { id: 'home', label: 'Home' },
                { id: 'services', label: 'Dispatch Services' },
                { id: 'how-it-works', label: 'How It Works' },
                { id: 'faq', label: 'FAQ' },
                { id: 'contact', label: 'Contact Us' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === item.id ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {[
                { id: 'home', label: 'Home' },
                { id: 'services', label: 'Dispatch Services' },
                { id: 'how-it-works', label: 'How It Works' },
                { id: 'faq', label: 'FAQ' },
                { id: 'contact', label: 'Contact Us' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary transition-colors w-full text-left"
                >
                  {item.label}
                </button>
              ))}
              <div className="px-3 py-2">
                <Link to="/login">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700">Get Started</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-16 min-h-screen flex items-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                🚛 #1 Rated Freight Dispatch Service
              </div>
              
              <div className="space-y-6">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  Maximize Your Trucking Profits With Expert Dispatch Services
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  MSR Freight Dispatch helps owner-operators and small fleets earn 15-20% more per mile through our premium load network, expert rate negotiation, and 24/7 dispatch support. Focus on driving while we handle the business side of trucking.
                </p>
                <div className="bg-muted/50 rounded-lg p-6 space-y-4">
                  <h3 className="font-semibold text-lg">Why Choose MSR Dispatch:</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center">
                      <TruckIcon className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                      <strong>Higher paying loads:</strong> Average 15-20% better rates than industry standards
                    </li>
                    <li className="flex items-center">
                      <TruckIcon className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                      <strong>Zero deadhead guarantee:</strong> We plan routes to keep you loaded both ways
                    </li>
                    <li className="flex items-center">
                      <TruckIcon className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                      <strong>24/7 dedicated dispatcher:</strong> Same person handles all your loads
                    </li>
                    <li className="flex items-center">
                      <TruckIcon className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                      <strong>Complete paperwork handling:</strong> We manage all documents and invoicing
                    </li>
                    <li className="flex items-center">
                      <TruckIcon className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                      <strong>Payment assurance:</strong> We follow up on all invoices until paid
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => scrollToSection('contact')}
                  size="lg" 
                  className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all bg-gradient-to-r from-blue-600 to-blue-700"
                >
                  Get a Free Dispatch Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Truck className="h-5 w-5 text-green-500 mr-2" />
                  Average 15-20% higher rates
                </div>
                <div className="flex items-center">
                  <Truck className="h-5 w-5 text-green-500 mr-2" />
                  24/7 Dispatch Support
                </div>
                <div className="flex items-center">
                  <Truck className="h-5 w-5 text-green-500 mr-2" />
                  Zero Deadhead Guarantee
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary rounded-3xl blur-3xl opacity-20 animate-pulse"></div>
              <img 
                src={'/public/Cargo.png'}
                alt="Truck driver using MSR dispatch services for higher profits"
                className="relative rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Professional Truck Dispatch Services That Grow Your Business</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our specialized dispatch services help owner-operators and small fleets earn more with less hassle. 
              We're not just dispatchers - we're your partners in building a more profitable trucking business.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-muted-foreground mb-4 leading-relaxed">
                          {service.description}
                        </p>
                        <ul className="space-y-2">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center text-sm">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How Our Truck Dispatch Service Works</h2>
            <p className="text-xl text-muted-foreground">
              Simple 4-step process to higher profits and easier operations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform">
                    <span className="text-white font-bold text-lg">{step.number}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary to-transparent"></div>
                  )}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Truck Dispatch FAQs</h2>
            <p className="text-xl text-muted-foreground">
              Answers to common questions about our professional dispatch services
            </p>
          </div>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqData.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`} 
                className="border rounded-lg px-6 bg-card hover:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <span className="font-semibold text-lg">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center mt-12">
            <p className="text-lg text-muted-foreground mb-6">
              Ready to increase your trucking profits? Get started today.
            </p>
            <Button 
              size="lg" 
              onClick={() => scrollToSection('contact')}
              className="px-8 py-6 bg-gradient-to-r from-blue-600 to-blue-700"
            >
              Get Your Free Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Start Earning More With Professional Dispatch</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Contact us today for a free consultation and discover how our dispatch services can increase your profits and reduce your stress.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-primary mr-3" />
                  <span className="text-foreground font-bold">+1 (307) 407-5003</span>
                </div>
                
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-primary mr-3" />
                  <span className="text-foreground font-bold">info@msrfreight.com</span>
                </div>

                <div className="pt-6">
                  <h3 className="font-semibold text-lg mb-3">Our Dispatch Guarantee:</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>No long-term contracts - cancel anytime</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>24-hour setup for most operators</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>First week satisfaction guarantee</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-6">Get Your Free Dispatch Evaluation</h3>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">First Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-input rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="John"
                        id="firstname"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Last Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-input rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="Doe"
                        id="lastname"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-input rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="john@company.com"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-input rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="Your Phone Number"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Company</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-input rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="Your Company"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 border border-input rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                      placeholder="Tell us about your trucking business and dispatch needs..."
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  
                  <Button type="submit" disabled={isSubmitting} className="w-full" size="lg">
                    {isSubmitting ? 'Sending...' : 'Get Free Consultation'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-800 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                &copy; 2024 MSR Freight Dispatch Services. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</Link>
                <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}