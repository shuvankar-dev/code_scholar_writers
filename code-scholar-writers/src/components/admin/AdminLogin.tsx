import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost/codescholarwriters-api/admin/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        // Store admin session
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminUser', JSON.stringify(data.user));
        
        // Redirect to admin dashboard
        navigate('/admin/dashboard');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-sm bg-gray-800 border-gray-700">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold text-white">Login to your account</CardTitle>
            <Button 
              variant="link" 
              className="text-blue-400 hover:text-blue-300 p-0 h-auto font-normal"
              onClick={() => navigate('/admin/register')}
            >
              Sign Up
            </Button>
          </div>
          <CardDescription className="text-gray-400">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium text-gray-300">Email</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="m@example.com"
                required
                value={formData.username}
                onChange={handleChange}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium text-gray-300">Password</Label>
                <Button 
                  variant="link" 
                  className="text-xs text-gray-400 hover:text-gray-300 p-0 h-auto font-normal"
                  type="button"
                >
                  Forgot your password?
                </Button>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col space-y-3">
          <Button 
            type="submit" 
            className="w-full bg-white text-black hover:bg-gray-100"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? 'Signing in...' : 'Login'}
          </Button>
        
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminLogin;