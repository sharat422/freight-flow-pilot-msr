
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0">
<<<<<<< HEAD
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
=======
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.03\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"1\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl"></div>
>>>>>>> f44cd6234ccbd963f954ca5a0ce270ba36d0bf9f
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Main CTA */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-6">
              🚛 Join Our Carrier Network
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight font-sans">
              Ready to Maximize Your
              <span className="block text-orange-400">Trucking Revenue?</span>
            </h2>
            
            <p className="text-xl text-gray-200 mb-8 leading-relaxed max-w-2xl font-sans">
              Join hundreds of successful owner-operators and small fleets who trust MSR Dispatch 
              to keep their wheels turning and profits growing. Start earning 15-20% more today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Link to="/login">
                <Button size="lg" className="text-lg px-8 py-6 bg-orange-500 text-white hover:bg-orange-600 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all font-semibold font-sans">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 backdrop-blur-sm transition-all font-sans"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call (555) 123-4567
              </Button>
            </div>
            
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 text-sm text-gray-300 font-sans">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                No setup fees
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                24/7 dispatch support
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                Higher paying loads
              </div>
            </div>
          </div>
          
          {/* Right Column - Contact Form */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2 font-sans">Get Your Free Quote</h3>
              <p className="text-gray-600 font-sans">Start earning more in less than 24 hours</p>
            </div>
            
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 font-sans">First Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all font-sans"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 font-sans">Last Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all font-sans"
                    placeholder="Smith"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 font-sans">Phone Number</label>
                <input 
                  type="tel" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all font-sans"
                  placeholder="(555) 123-4567"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 font-sans">Email Address</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all font-sans"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 font-sans">Equipment Type</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all font-sans">
                  <option>Select Equipment Type</option>
                  <option>Dry Van</option>
                  <option>Reefer</option>
                  <option>Flatbed</option>
                  <option>Step Deck</option>
                  <option>Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 font-sans">Number of Trucks</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all font-sans">
                  <option>1 Truck</option>
                  <option>2-5 Trucks</option>
                  <option>6-10 Trucks</option>
                  <option>10+ Trucks</option>
                </select>
              </div>
              
              <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 font-sans">
                Get My Free Quote
                <Mail className="ml-2 h-5 w-5" />
              </Button>
            </form>
            
            <p className="text-xs text-gray-500 text-center mt-4 font-sans">
              By submitting this form, you agree to receive communications from MSR Dispatch.
            </p>
          </div>
        </div>
        
        {/* Bottom Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="text-white">
            <div className="text-3xl font-bold text-orange-400 mb-2 font-sans">500+</div>
            <div className="text-sm text-gray-300 font-sans">Active Carriers</div>
          </div>
          <div className="text-white">
            <div className="text-3xl font-bold text-orange-400 mb-2 font-sans">98%</div>
            <div className="text-sm text-gray-300 font-sans">On-Time Delivery</div>
          </div>
          <div className="text-white">
            <div className="text-3xl font-bold text-orange-400 mb-2 font-sans">$2M+</div>
            <div className="text-sm text-gray-300 font-sans">Weekly Volume</div>
          </div>
          <div className="text-white">
            <div className="text-3xl font-bold text-orange-400 mb-2 font-sans">24/7</div>
            <div className="text-sm text-gray-300 font-sans">Support Available</div>
          </div>
        </div>
      </div>
    </section>
  );
}
