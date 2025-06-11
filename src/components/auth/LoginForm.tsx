
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
    { role: 'Admin', email: 'admin@msrfreight.com', password: 'admin123', color: 'bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/20' },
    { role: 'Dispatcher', email: 'dispatcher@msrfreight.com', password: 'dispatch123', color: 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/20' },
    { role: 'Carrier', email: 'carrier@msrfreight.com', password: 'carrier123', color: 'bg-success/10 text-success border-success/20 hover:bg-success/20' },
    { role: 'Driver', email: 'driver@msrfreight.com', password: 'driver123', color: 'bg-warning/10 text-warning border-warning/20 hover:bg-warning/20' },
  ];

  return (
    <div className="space-y-6">
      <Card className="w-full max-w-md glass-effect shadow-2xl border-0 animate-scale-in">
        <CardHeader className="space-y-4 pb-8">
          <CardTitle className="text-2xl text-center font-bold">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-center text-base">
            Sign in to access your MSR dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-3">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 text-base transition-all duration-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12 text-base transition-all duration-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            {error && (
              <Alert variant="destructive" className="animate-slide-up">
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
      <Card className="w-full max-w-md glass-effect shadow-xl border-0 animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Demo Access</CardTitle>
          <CardDescription>
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
