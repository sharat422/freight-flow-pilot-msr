
import { Phone, Mail, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function ContactSection() {
  return (
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
  );
}
