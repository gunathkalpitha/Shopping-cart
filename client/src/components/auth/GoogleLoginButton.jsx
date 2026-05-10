import React from 'react';

export default function GoogleLoginButton() {
  const handleGoogleLogin = () => {
    console.log('Google login clicked');
    // Google OAuth login logic
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
    >
      <span className="text-blue-600 font-semibold">Login with Google</span>
    </button>
  );
}
