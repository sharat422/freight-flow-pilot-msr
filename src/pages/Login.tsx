
import { LoginForm } from '@/components/auth/LoginForm';

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/20 p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-secondary/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="w-full max-w-md space-y-8 relative z-10">
        {/* Logo and Header */}
        <div className="text-center space-y-6 animate-fade-in">
          <div className="mx-auto w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-2xl animate-scale-in">
            <span className="text-white font-bold text-2xl tracking-wider">MSR</span>
          </div>
          <div className="space-y-3">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              MSR Freight Dispatchers
            </h1>
            <p className="text-muted-foreground text-lg">
              Streamline your logistics operations with precision
            </p>
          </div>
        </div>

        {/* Login Form */}
        <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
