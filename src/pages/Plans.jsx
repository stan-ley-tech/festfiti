import React from 'react';
import PublicNavbar from '../components/PublicNavbar';

export default function Plans() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PublicNavbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 mt-20">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Pricing Plans</h1>
        <p className="text-gray-600">Coming soon...</p>
      </div>
    </div>
  );
}
