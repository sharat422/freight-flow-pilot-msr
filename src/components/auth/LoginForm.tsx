
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
        title: "Login successful",
        description: "Welcome to MSR Freight Dispatchers!",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const demoCredentials = [
    { role: 'Admin', email: 'admin@msrfreight.com', password: 'admin123' },
    { role: 'Dispatcher', email: 'dispatcher@msrfreight.com', password: 'dispatch123' },
    { role: 'Carrier', email: 'carrier@msrfreight.com', password: 'carrier123' },
    { role: 'Driver', email: 'driver@msrfreight.com', password: 'driver123' },
  ];

  return (
    <div className="space-y-6">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Sign In</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access MSR Freight Dispatchers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Demo Credentials */}
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-lg">Demo Credentials</CardTitle>
          <CardDescription>Click any role to auto-fill login credentials</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            {demoCredentials.map((cred) => (
              <Button
                key={cred.role}
                variant="outline"
                size="sm"
                onClick={() => {
                  setEmail(cred.email);
                  setPassword(cred.password);
                }}
                className="text-xs"
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
