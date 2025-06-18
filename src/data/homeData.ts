
import { Package, Users, MapPin, Truck, Star, Clock, TrendingUp, Shield, Zap } from 'lucide-react';

export const services = [
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

export const stats = [
  { number: "500+", label: "Active Drivers", icon: Users },
  { number: "98%", label: "Customer Satisfaction", icon: Star },
  { number: "24/7", label: "Support Available", icon: Clock },
  { number: "$2M+", label: "Revenue Generated", icon: TrendingUp }
];

export const benefits = [
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

export const steps = [
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

export const testimonials = [
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

export const partners = [
  "SWIFT LOGISTICS",
  "TRANSCORP", 
  "FREIGHT MASTERS",
  "CARGO SOLUTIONS",
  "LOGISTICS PRO",
  "TRANSPORT PLUS"
];

export const faqData = [
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
