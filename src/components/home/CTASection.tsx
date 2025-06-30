import { Link } from 'react-router-dom';More actions
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 relative overflow-hidden">
      <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.05\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"1\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
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
              <ArrowRight className="ml-2 h-5 w-5" />More actions
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2 border-white text-white hover:bg-white hover:text-blue-600 transition-all">
            Schedule Demo
          </Button>
        </div>
      </div>
    </section>
  );
}
