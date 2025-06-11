
import { LoginForm } from '@/components/auth/LoginForm';

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <div className="mx-auto w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-2xl">MSR</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold">MSR Freight Dispatchers</h1>
            <p className="text-muted-foreground">Streamline your logistics operations</p>
          </div>
        </div>

        {/* Login Form */}
        <div className="animate-fade-in">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
