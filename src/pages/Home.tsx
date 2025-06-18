import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone, Mail, ArrowRight, CheckCircle, Users, Truck, Package, MapPin, Clock, Star, Play, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Camera } from 'lucide-react';


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
      features: ["Top-rated broker network", "Rate optimization", "Direct shipper connections"]
    },
    {
      title: "Dedicated Dispatcher Support", 
      description: "Your personal dispatcher handling all communications, paperwork, and logistics so you can focus on driving",
      icon: Users,
      features: ["Personal dispatcher", "24/7 availability", "Complete paperwork handling"]
    },
    {
      title: "Route Planning & Optimization",
      description: "Intelligent route planning with fuel optimization to minimize deadhead miles and maximize profitability",
      icon: MapPin,
      features: ["Zero deadhead routing", "Fuel optimization", "Efficient load planning"]
    },
    {
       title: "Carrier Setup & Support",
      description: "Complete carrier packet setup and ongoing administrative support for seamless operations",
      icon: Truck,
      features: ["Carrier packet setup", "Administrative support", "Compliance assistance"]
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Connect Your Fleet",
      description: "Integrate your vehicles and drivers into our comprehensive platform"
    },
    {
      number: "02", 
      title: "Optimize Routes",
      description: "Our AI algorithms find the most efficient routes for your deliveries"
    },
    {
      number: "03",
      title: "Track & Manage",
      description: "Monitor your operations in real-time with detailed analytics"
    },
    {
      number: "04",
      title: "Scale Your Business",
      description: "Grow your operations with data-driven insights and automation"
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
             {/* Mobile menu button <Link to="/login">
                <Button className="ml-4">Get Started</Button>
              </Link> */} 
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
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">Add commentMore actions
                🚛 #1 Freight Dispatching Service
              </div>
              
              <div className="space-y-6">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                   
                  Keep Your Wheels Turning
                  <span className=" bg-clip-text "> & Profits Growing</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  MSR Freight Dispatchers is your trusted partner in keeping your wheels turning and your profits growing. 
                  We provide reliable, hassle-free dispatching services for owner-operators and small trucking fleets, 
                  helping you focus on driving while we handle the paperwork, load hunting, and negotiations.
                </p>
                <div className="bg-muted/50 rounded-lg p-6 space-y-4">
                  <h3 className="font-semibold text-lg">🔑 What We Offer:</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      Load booking with top-rated brokers & shippers
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      Rate negotiation to maximize your earnings
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      Dedicated dispatcher support
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      Carrier packet setup & paperwork handling
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      Route planning & fuel optimization
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      24/7 support and check calls
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/login">
                {/*
                  <Button size="lg" className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                */}
                </Link>
               {/* <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button> */}
              </div>

              <div className="flex items-center space-x-8 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Truck className="h-5 w-5 text-red-500 mr-2" />
                  Zero deadhead miles
                </div>
                <div className="flex items-center">
                  <Truck className="h-5 w-5 text-red-500 mr-2" />
                  Maximum revenue
                </div>
                <div className="flex items-center">
                  <Truck className="h-5 w-5 text-red-500 mr-2" />
                  Always loaded
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary rounded-3xl blur-3xl opacity-20 animate-pulse"></div>
              <img 
                src={'/public/Cargo.png'}
                alt="Modern logistics dashboard"
                className="relative rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Your Success Is Our Mission</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our experienced dispatchers work tirelessly to find high-paying freight, manage your routes efficiently, 
              and support you every mile of the way. Whether you're an independent driver or managing a fleet, 
              we make sure you're always loaded and moving.
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground">
              Get started in minutes with our simple 4-step process
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
              Have more questions? We're here to help!
            </p>
            <Button 
              size="lg" 
              onClick={() => scrollToSection('contact')}
              className="px-8 py-6"
            >
              Contact Us
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      {/*<section className="py-20 bg-gradient-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Operations?
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Join thousands of logistics companies that trust MSR for their dispatching needs.
            Start your free trial today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6 shadow-lg hover:shadow-xl">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-primary">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section> */}

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Get in Touch</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Ready to streamline your freight operations? Contact us today for a personalized demo.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-4">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">Phone</div>
                    <div className="text-muted-foreground">+1 (307) 407-5003</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-4">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-muted-foreground">info@msrfreight.com</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-4">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">Business Hours</div>
                    <div className="text-muted-foreground">24/7 Support Available</div>
                  </div>
                </div>
              </div>
            </div>
            
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-6">Send us a message</h3>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">First Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-input rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Last Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-input rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-input rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="john@company.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Company</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-input rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="Your Company"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 border border-input rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                      placeholder="Tell us about your dispatching needs..."
                    ></textarea>
                  </div>
                  
                  <Button className="w-full" size="lg">
                    Send Message
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
          
          
          <div className="border-t border-gray-800 ">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                &copy; 2024 MSR Freight Dispatchers. All rights reserved.
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
