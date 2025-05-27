
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/sonner';
import { Eye, EyeOff, CreditCard, Shield, TrendingUp } from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) throw error;
        toast.success('Welcome back!', {
          description: 'You have successfully signed in.',
        });
        navigate('/');
      } else {
        const { error } = await signUp(email, password, fullName);
        if (error) throw error;
        toast.success('Account created!', {
          description: 'Please check your email to verify your account.',
        });
      }
    } catch (error: any) {
      toast.error('Authentication failed', {
        description: error.message || 'Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Branding */}
        <div className="hidden lg:block space-y-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              ScoreSense Credit AI
            </h1>
            <p className="text-xl text-muted-foreground mt-2">
              Advanced credit scoring powered by AI and alternative data
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="rounded-full p-3 bg-blue-100 text-blue-600">
                <CreditCard size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Comprehensive Analysis</h3>
                <p className="text-muted-foreground">Get detailed credit assessments using both traditional and alternative data sources</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="rounded-full p-3 bg-indigo-100 text-indigo-600">
                <TrendingUp size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">AI-Powered Insights</h3>
                <p className="text-muted-foreground">Receive personalized recommendations and improvement strategies</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="rounded-full p-3 bg-purple-100 text-purple-600">
                <Shield size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Secure & Private</h3>
                <p className="text-muted-foreground">Your data is encrypted and protected with bank-level security</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Auth form */}
        <Card className="w-full max-w-md mx-auto shadow-2xl border-0">
          <CardHeader className="text-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
            <CardTitle className="text-2xl">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </CardTitle>
            <CardDescription>
              {isLogin 
                ? 'Sign in to access your credit dashboard' 
                : 'Start your credit journey with ScoreSense'}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-6">
            <Tabs value={isLogin ? 'login' : 'signup'} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login" onClick={() => setIsLogin(true)}>
                  Sign In
                </TabsTrigger>
                <TabsTrigger value="signup" onClick={() => setIsLogin(false)}>
                  Sign Up
                </TabsTrigger>
              </TabsList>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="John Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required={!isLogin}
                    />
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </Button>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  disabled={loading}
                >
                  {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
                </Button>
              </form>
            </Tabs>
          </CardContent>
          
          <CardFooter className="text-center text-sm text-muted-foreground bg-gray-50 rounded-b-lg">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
