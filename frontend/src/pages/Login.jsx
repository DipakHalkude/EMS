import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      if (response.data.success) {
        login(response.data.user);
        localStorage.setItem('token', response.data.token);

        if (response.data.user.role === 'admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/employee-dashboard');
        }
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        setError(error.response.data.error);
      } else {
        setError("Server Error");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
      {/* Background Grid */}
      <div className="fixed inset-0 -z-10 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
      </div>

      <div className="w-96 bg-gradient-to-br from-gray-900/40 to-blue-900/40 backdrop-blur-lg rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 p-8 flex flex-col space-y-6 transform hover:scale-105 transition-all duration-500">
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">EMS Portal</h1>
          <p className="text-cyan-300/70">Sign in to your account</p>
          {error && <p className='text-red-300 bg-red-500/20 backdrop-blur-sm p-2 rounded-lg border border-red-500/30 mt-3'>{error}</p>}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-cyan-300 font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="your.email@example.com"
              className="bg-gray-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password with Eye Button */}
          <div className="flex flex-col relative">
            <label htmlFor="password" className="text-cyan-300 font-medium mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="bg-gray-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 pr-10"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-11 text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="flex items-center justify-between text-cyan-300/70">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox rounded text-cyan-500 bg-gray-800/50 border-cyan-500/30 focus:ring-cyan-400" />
              <span>Remember Me</span>
            </label>
            <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300">Forgot Password?</a>
          </div>

          <button
            type="submit"
            className="relative group bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30 border border-cyan-400/30 overflow-hidden"
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 group-hover:translate-x-32 transition-transform duration-700"></div>
            <span className="relative">Login</span>
          </button>
        </form>

        <div className="text-center text-cyan-300/70">
          <p>Don't have an account? <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300">Sign Up</a></p>
        </div>

        {/* Status Indicator */}
        <div className="flex justify-center items-center gap-2 mt-4 text-cyan-300/50 text-sm">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>Authentication system online</span>
        </div>
      </div>
    </div>
  )
}

export default Login;
