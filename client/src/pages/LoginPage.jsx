import React, { useState } from 'react';
import GoogleLoginButton from '../components/auth/GoogleLoginButton';
import FacebookLoginButton from '../components/auth/FacebookLoginButton';
import PasskeyButton from '../components/auth/PasskeyButton';
import LoginModal from '../components/auth/LoginModal';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function LoginPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
          <div className="space-y-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Login with Email
            </button>
            <GoogleLoginButton />
            <FacebookLoginButton />
            <PasskeyButton />
          </div>
          <p className="text-center mt-6 text-gray-600">
            Don't have an account? <a href="/signup" className="text-blue-600 hover:text-blue-800">Sign up</a>
          </p>
        </div>
      </main>
      <Footer />
      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
