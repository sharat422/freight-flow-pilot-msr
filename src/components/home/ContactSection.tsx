
import { useState } from 'react';
import { Phone, Mail, Clock, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const formSchema = z.object({
  firstname: z.string().min(1, 'First name is required').max(50, 'First name too long'),
  lastname: z.string().min(1, 'Last name is required').max(50, 'Last name too long'),
  email: z.string().email('Valid email is required').max(100, 'Email too long'),
  phone: z.string().regex(/^[0-9+\-\s()]{10,20}$/, 'Valid phone number required').optional().or(z.literal('')),
  company: z.string().max(100, 'Company name too long').optional(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message too long').optional()
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactSection() {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      company: '',
      message: ''
    }
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
      
      const response = await fetch(`${apiUrl}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        let errorMessage = 'Failed to send message';
        
        if (response.status === 429) {
          errorMessage = 'Too many requests. Please try again later.';
        } else if (errorData?.error) {
          errorMessage = errorData.error;
        } else if (response.status >= 500) {
          errorMessage = 'Server error. Please try again later.';
        }
        
        throw new Error(errorMessage);
      }

      const result = await response.json();
      
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      });
      
      reset();

    } catch (error) {
      console.error('Submission error:', error);
      
      let errorMessage = 'Failed to send message. Please try again.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <section id="contact" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
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
                  <div className="text-muted-foreground">+1 (307) 407-5003</div>
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
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-3">First Name *</label>
                    <Input
                      {...register('firstname')}
                      placeholder="John"
                      disabled={isSubmitting}
                      className="px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                    {errors.firstname && (
                      <p className="mt-1 text-sm text-red-500">{errors.firstname.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-3">Last Name *</label>
                    <Input
                      {...register('lastname')}
                      placeholder="Doe"
                      disabled={isSubmitting}
                      className="px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                    {errors.lastname && (
                      <p className="mt-1 text-sm text-red-500">{errors.lastname.message}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-3">Email *</label>
                  <Input
                    type="email"
                    {...register('email')}
                    placeholder="john@company.com"
                    disabled={isSubmitting}
                    className="px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-3">Phone</label>
                  <Input
                    {...register('phone')}
                    placeholder="(123) 456-7890"
                    disabled={isSubmitting}
                    className="px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-3">Company</label>
                  <Input
                    {...register('company')}
                    placeholder="Your Company"
                    disabled={isSubmitting}
                    className="px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-3">Message</label>
                  <Textarea
                    {...register('message')}
                    rows={4}
                    placeholder="Tell us about your dispatching needs..."
                    disabled={isSubmitting}
                    className="px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none transition-all"
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
                  )}
                </div>
                
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 text-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl shadow-lg hover:shadow-xl transition-all" 
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
