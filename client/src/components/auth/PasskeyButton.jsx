import React from 'react';

export default function PasskeyButton() {
  const handlePasskeyLogin = () => {
    console.log('Passkey login clicked');
    // WebAuthn/Passkey login logic
  };

  return (
    <button
      onClick={handlePasskeyLogin}
      className="flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
    >
      <span className="font-semibold">Login with Passkey</span>
    </button>
  );
}
