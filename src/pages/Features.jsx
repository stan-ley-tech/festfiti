import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Zap, Shield, BarChart3, Users, Ticket, DollarSign } from 'lucide-react';
import PublicNavbar from '../components/PublicNavbar';

export default function FeaturesPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Ticket,
      title: 'Smart Ticket Management',
      description: 'Advanced fraud detection and real-time ticket validation to keep your events secure.',
      color: 'text-blue-600'
    },
    {
      icon: BarChart3,
      title: 'Real-Time Analytics',
      description: 'Track your event performance with comprehensive dashboards and insights.',
      color: 'text-green-600'
    },
    {
      icon: Shield,
      title: 'TicketGuard Security',
      description: 'AI-powered fraud detection and ticket validation system.',
      color: 'text-red-600'
    },
    {
      icon: DollarSign,
      title: 'Budget Management',
      description: 'Monitor expenses, manage budgets, and get AI-powered financial insights.',
      color: 'text-yellow-600'
    },
    {
      icon: Users,
      title: 'Vendor Management',
      description: 'Streamline vendor coordination and track performance metrics.',
      color: 'text-purple-600'
    },
    {
      icon: Zap,
      title: 'AI Assistant',
      description: 'Get instant help with FestBuddy, your AI-powered event assistant.',
      color: 'text-indigo-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <PublicNavbar />

      <div className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Powerful Features for
              <span className="text-primary-600"> Modern Events</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to manage successful events, from ticket validation to budget tracking and vendor coordination.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <div className={`w-12 h-12 ${feature.color} mb-6`}>
                  <feature.icon className="w-full h-full" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center bg-white rounded-2xl p-12 shadow-sm border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to get started?</h2>
            <p className="text-gray-600 mb-8">Join thousands of event organizers who trust FestFiti.</p>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => navigate('/events')}
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-xl font-semibold transition-all"
              >
                Browse Events
              </button>
              <button
                onClick={() => navigate('/login')}
                className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3 rounded-xl font-semibold transition-all"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
