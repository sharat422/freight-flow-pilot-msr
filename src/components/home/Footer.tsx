
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
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
  );
}
