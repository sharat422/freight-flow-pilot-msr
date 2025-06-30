import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, TrendingUp, Truck, TruckIcon, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { benefits } from '@/data/homeData';
import { useState } from 'react';

export default function HeroSection() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
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
                <p className="text-xl text-foreground leading-relaxed">
                  MSR Freight Dispatch helps owner-operators and small fleets earn 15-20% more per mile through our premium load network, expert rate negotiation, and 24/7 dispatch support. Focus on driving while we handle the business side of trucking.
                </p>
                <div className="bg-muted/50 rounded-lg p-6 space-y-4">
                  <h3 className="font-semibold text-lg">Why Choose MSR Dispatch:</h3>
                  <ul className="space-y-2 text-foreground">
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

              <div className="flex flex-wrap items-center gap-6 text-sm text-foreground">
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
                src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Truck driver using MSR dispatch services for higher profits"
                className="relative rounded-3xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
  );
}
