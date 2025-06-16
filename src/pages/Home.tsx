import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone, Mail, ArrowRight, CheckCircle, Users, Truck, Package, MapPin, Clock, Star, ChevronDown, Shield, Zap, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

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
      title: "Load Booking & Negotiation",
      description: "Direct connections with top-rated brokers and shippers, plus expert rate negotiation to maximize your earnings on every load",
      icon: Package,
      features: ["Top-rated broker network", "Rate optimization", "Direct shipper connections"],
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Dedicated Dispatcher Support", 
      description: "Your personal dispatcher handling all communications, paperwork, and logistics so you can focus on driving",
      icon: Users,
      features: ["Personal dispatcher", "24/7 availability", "Complete paperwork handling"],
      color: "from-green-500 to-green-600"
    },
    {
      title: "Route Planning & Optimization",
      description: "Intelligent route planning with fuel optimization to minimize deadhead miles and maximize profitability",
      icon: MapPin,
      features: ["Zero deadhead routing", "Fuel optimization", "Efficient load planning"],
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Carrier Setup & Support",
      description: "Complete carrier packet setup and ongoing administrative support for seamless operations",
      icon: Truck,
      features: ["Carrier packet setup", "Administrative support", "Compliance assistance"],
      color: "from-orange-500 to-orange-600"
    }
  ];

  const stats = [
    { number: "500+", label: "Active Drivers", icon: Users },
    { number: "98%", label: "Customer Satisfaction", icon: Star },
    { number: "24/7", label: "Support Available", icon: Clock },
    { number: "$2M+", label: "Revenue Generated", icon: TrendingUp }
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Trusted Partnership",
      description: "Work with experienced dispatchers who understand your business"
    },
    {
      icon: Zap,
      title: "Instant Load Matching",
      description: "Get matched with high-paying loads in real-time"
    },
    {
      icon: TrendingUp,
      title: "Revenue Growth",
      description: "Increase your earnings with optimized route planning"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Connect Your Fleet",
      description: "Integrate your vehicles and drivers into our comprehensive platform",
      icon: Truck
    },
    {
      number: "02", 
      title: "Optimize Routes",
      description: "Our AI algorithms find the most efficient routes for your deliveries",
      icon: MapPin
    },
    {
      number: "03",
      title: "Track & Manage",
      description: "Monitor your operations in real-time with detailed analytics",
      icon: Users
    },
    {
      number: "04",
      title: "Scale Your Business",
      description: "Grow your operations with data-driven insights and automation",
      icon: TrendingUp
    }
  ];

  const testimonials = [
    {
      quote: "MSR has completely transformed my business. I'm making 30% more per month and barely touch the paperwork anymore.",
      author: "Mike Johnson",
      role: "Owner-Operator",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
      quote: "The best dispatching service I've ever used. They find loads I never would have found on my own.",
      author: "Sarah Davis",
      role: "Fleet Owner",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      quote: "24/7 support means I never feel alone on the road. MSR has my back every mile of the way.",
      author: "Carlos Rodriguez",
      role: "Independent Driver",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
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
      question: "What percentage do you charge for dispatching services?",
      answer: "Our standard dispatch fee is competitive with industry rates. We work on a percentage basis that ensures we're invested in finding you the highest-paying loads. Contact us for detailed pricing information tailored to your specific needs."
    },
    {
      question: "How do you find loads for my truck?",
      answer: "We have established relationships with top-rated brokers and direct shippers across the country. Our dispatchers actively search load boards, negotiate with our broker network, and maintain ongoing relationships to secure consistent, high-paying freight for your equipment."
    },
    {
      question: "Do you handle all the paperwork?",
      answer: "Yes! We handle all paperwork including rate confirmations, BOLs, invoicing, and follow-up on payments. We also help with carrier packet setup and maintain all necessary documentation for compliance."
    },
    {
      question: "What if I don't like a load you find?",
      answer: "You have the final say on every load. We present options to you with all the details, and you decide what works best for your schedule and preferences. We never book loads without your approval."
    },
    {
      question: "How do you ensure I don't run empty miles?",
      answer: "Our route planning focuses on minimizing deadhead miles by strategically planning your next load while you're completing your current one. We analyze freight patterns and work to keep you moving in freight-heavy lanes."
    },
    {
      question: "What support do you provide while I'm on the road?",
      answer: "We provide 24/7 support including check calls, handling any issues that arise during transit, coordinating with receivers, and managing any delays or problems. You're never alone on the road."
    },
    {
      question: "How quickly can you find me loads?",
      answer: "Typically, we can have your next load lined up before you complete your current delivery. Our goal is to minimize downtime and keep your wheels turning consistently."
    },
    {
      question: "Do you work with new owner-operators?",
      answer: "Absolutely! We work with both experienced owner-operators and those new to the business. We provide extra guidance and support to help new operators establish themselves successfully in the industry."
    },
    {
      question: "What equipment types do you dispatch?",
      answer: "We dispatch various equipment types including dry vans, reefers, flatbeds, step decks, and specialized equipment. Our dispatchers have experience across all major freight categories."
    },
    {
      question: "How do you handle payment and invoicing?",
      answer: "We handle all invoicing and follow up on payments. We work with factoring companies and can help set up quick pay options to improve your cash flow. Payment terms and processes are clearly outlined in our agreement."
    }
  ];

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
                { id: 'services', label: 'Services' },
                { id: 'how-it-works', label: 'How It Works' },
                { id: 'faq', label: 'FAQ' },
                { id: 'contact', label: 'Contact' }
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
              <Link to="/login">
                <Button className="ml-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">Get Started</Button>
              </Link>
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
                { id: 'services', label: 'Services' },
                { id: 'how-it-works', label: 'How It Works' },
                { id: 'faq', label: 'FAQ' },
                { id: 'contact', label: 'Contact' }
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
                🚛 #1 Freight Dispatching Service
              </div>
              
              <div className="space-y-6">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  Keep Your Wheels Turning
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> & Profits Growing</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  MSR Freight Dispatchers is your trusted partner in keeping your wheels turning and your profits growing. 
                  We provide reliable, hassle-free dispatching services for owner-operators and small trucking fleets.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
                  {benefits.map((benefit, index) => {
                    const IconComponent = benefit.icon;
                    return (
                      <div key={index} className="flex items-start space-x-3 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-white/20 shadow-sm">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <IconComponent className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm">{benefit.title}</h4>
                          <p className="text-xs text-muted-foreground mt-1">{benefit.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/login">
                  <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-2">
                  Learn More
                </Button>
              </div>

              <div className="flex items-center space-x-8 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Zero deadhead miles
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Maximum revenue
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  24/7 support
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Modern logistics dashboard"
                  className="w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              {/* Floating Stats Cards */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">+30%</div>
                    <div className="text-sm text-muted-foreground">Revenue Increase</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-xl border">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">500+</div>
                    <div className="text-sm text-muted-foreground">Happy Drivers</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <IconComponent className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-muted-foreground font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-muted-foreground font-medium">Trusted by owner-operators and small fleets nationwide</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
            {partners.map((partner, index) => (
              <div key={index} className="text-lg font-bold text-muted-foreground hover:opacity-100 transition-opacity">
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
              🎯 Our Services
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Your Success Is Our Mission</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our experienced dispatchers work tirelessly to find high-paying freight, manage your routes efficiently, 
              and support you every mile of the way.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card key={index} className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-white to-gray-50 hover:scale-105">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-6">
                      <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-muted-foreground mb-6 leading-relaxed">
                          {service.description}
                        </p>
                        <ul className="space-y-3">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center text-sm">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
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
      <section id="how-it-works" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
              ⚡ How It Works
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Started in Minutes</h2>
            <p className="text-xl text-muted-foreground">
              Our simple 4-step process gets you on the road to success
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="text-center group relative">
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border">
                    <div className="relative mb-6">
                      <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform">
                        <IconComponent className="h-10 w-10 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {step.number}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                  
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-300 to-transparent z-10"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-6">
              💬 Testimonials
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Drivers Say</h2>
            <p className="text-xl text-muted-foreground">
              Real feedback from real drivers who trust MSR with their success
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-gradient-to-br from-white to-gray-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-lg text-muted-foreground mb-6 italic leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.author}
                      className="w-12 h-12 rounded-full mr-4 border-2 border-blue-100"
                    />
                    <div>
                      <div className="font-semibold">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mb-6">
              ❓ FAQ
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground">
              Common questions from owner-operators about our dispatching services
            </p>
          </div>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqData.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`} 
                className="border-0 rounded-2xl px-6 bg-white shadow-lg hover:shadow-xl transition-all duration-300"
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
              Have more questions? We're here to help!
            </p>
            <Button 
              size="lg" 
              onClick={() => scrollToSection('contact')}
              className="px-8 py-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            >
              Contact Us
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E']"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Operations?
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Join thousands of logistics companies that trust MSR for their dispatching needs.
            Start your free trial today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6 bg-white text-blue-600 hover:bg-gray-50 shadow-lg hover:shadow-xl">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2 border-white text-white hover:bg-white hover:text-blue-600 transition-all">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-6">
                📞 Contact Us
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Get in Touch</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Ready to streamline your freight operations? Contact us today for a personalized demo.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mr-4">
                    <Phone className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-lg">Phone</div>
                    <div className="text-muted-foreground">+1 (555) 123-4567</div>
                  </div>
                </div>
                
                <div className="flex items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl">
                  <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mr-4">
                    <Mail className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-lg">Email</div>
                    <div className="text-muted-foreground">info@msrfreight.com</div>
                  </div>
                </div>
                
                <div className="flex items-center p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-2xl">
                  <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4">
                    <Clock className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-lg">Business Hours</div>
                    <div className="text-muted-foreground">24/7 Support Available</div>
                  </div>
                </div>
              </div>
            </div>
            
            <Card className="shadow-2xl border-0 bg-gradient-to-br from-white to-gray-50">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-3">First Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-3">Last Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold mb-3">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                      placeholder="john@company.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold mb-3">Company</label>
                    <input
                      type="text"
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                      placeholder="Your Company"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold mb-3">Message</label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none transition-all"
                      placeholder="Tell us about your dispatching needs..."
                    ></textarea>
                  </div>
                  
                  <Button className="w-full py-4 text-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl shadow-lg hover:shadow-xl transition-all" size="lg">
                    Send Message
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg">MSR</span>
                </div>
                <span className="text-2xl font-bold">MSR Freight Dispatchers</span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed text-lg">
                Professional freight dispatching solutions for modern logistics companies. 
                Streamline your operations with our intelligent platform.
              </p>
              <div className="flex space-x-4">
                <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <span className="text-lg font-bold">f</span>
                </div>
                <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <span className="text-lg font-bold">t</span>
                </div>
                <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <span className="text-lg font-bold">in</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-lg">Services</h4>
              <ul className="space-y-4 text-gray-400">
                <li><a href="#services" className="hover:text-white transition-colors hover:underline">Load Management</a></li>
                <li><a href="#services" className="hover:text-white transition-colors hover:underline">Driver Coordination</a></li>
                <li><a href="#services" className="hover:text-white transition-colors hover:underline">Route Optimization</a></li>
                <li><a href="#services" className="hover:text-white transition-colors hover:underline">Fleet Management</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-lg">Company</h4>
              <ul className="space-y-4 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors hover:underline">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:underline">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:underline">Blog</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors hover:underline">Contact</a></li>
                <li><Link to="/login" className="hover:text-white transition-colors hover:underline">Login</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400">
                &copy; 2024 MSR Freight Dispatchers. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors hover:underline">Privacy Policy</Link>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors hover:underline">Terms of Service</Link>
                <a href="#" className="text-gray-400 hover:text-white transition-colors hover:underline">Support</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
