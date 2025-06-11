
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(email, password);
      toast({
        title: "Welcome back!",
        description: "You've successfully signed in to MSR Freight Dispatchers.",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const demoCredentials = [
    { role: 'Admin', email: 'admin@msrfreight.com', password: 'admin123', color: 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20' },
    { role: 'Dispatcher', email: 'dispatcher@msrfreight.com', password: 'dispatch123', color: 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/20' },
    { role: 'Carrier', email: 'carrier@msrfreight.com', password: 'carrier123', color: 'bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20' },
    { role: 'Driver', email: 'driver@msrfreight.com', password: 'driver123', color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20 hover:bg-yellow-500/20' },
  ];

  return (
    <div className="space-y-6">
      <Card className="w-full max-w-md bg-gray-800/50 backdrop-blur-lg border-gray-700 shadow-2xl animate-scale-in">
        <CardHeader className="space-y-4 pb-8">
          <CardTitle className="text-2xl text-center font-bold text-white">
            Sign In
          </CardTitle>
          <CardDescription className="text-center text-base text-gray-400">
            Access your dispatching dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-3">
              <Label htmlFor="email" className="text-sm font-medium text-gray-300">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 text-base bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-primary focus:ring-primary/20"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="password" className="text-sm font-medium text-gray-300">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12 text-base bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-primary focus:ring-primary/20"
              />
            </div>
            {error && (
              <Alert variant="destructive" className="animate-slide-up bg-red-500/10 border-red-500/20 text-red-400">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button 
              type="submit" 
              className="w-full h-12 text-base font-medium button-glow bg-gradient-primary hover:shadow-lg transition-all duration-300" 
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Demo Credentials */}
      <Card className="w-full max-w-md bg-gray-800/30 backdrop-blur-lg border-gray-700 shadow-xl animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg text-white">Demo Access</CardTitle>
          <CardDescription className="text-gray-400">
            Quick access for testing different user roles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {demoCredentials.map((cred) => (
              <Button
                key={cred.role}
                variant="outline"
                size="sm"
                onClick={() => {
                  setEmail(cred.email);
                  setPassword(cred.password);
                }}
                className={`text-xs font-medium transition-all duration-200 border ${cred.color}`}
              >
                {cred.role}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
