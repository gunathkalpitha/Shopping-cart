import React from 'react';

export default function FacebookLoginButton() {
  const handleFacebookLogin = () => {
    console.log('Facebook login clicked');
    // Facebook OAuth login logic
  };

  return (
    <button
      onClick={handleFacebookLogin}
      className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
    >
      <span className="font-semibold">Login with Facebook</span>
    </button>
  );
}
