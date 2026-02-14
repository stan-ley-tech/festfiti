import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Tag, ArrowRight } from 'lucide-react';
import PublicNavbar from '../components/PublicNavbar';

export default function UpdatesPage() {
  const navigate = useNavigate();

  const updates = [
    {
      date: '2024-02-10',
      title: 'Enhanced AI-Powered Analytics',
      description: 'Our FestBuddy AI assistant now provides even more detailed insights about your events, including predictive analytics for ticket sales and attendance patterns.',
      tag: 'Feature',
      tagColor: 'bg-blue-100 text-blue-700'
    },
    {
      date: '2024-02-05',
      title: 'Mobile App Improvements',
      description: 'Significant performance improvements and bug fixes for the mobile experience. QR code scanning is now 50% faster.',
      tag: 'Enhancement',
      tagColor: 'bg-green-100 text-green-700'
    },
    {
      date: '2024-01-28',
      title: 'New Vendor Management Features',
      description: 'Introducing vendor performance scoring, automated contract management, and real-time communication tools.',
      tag: 'Feature',
      tagColor: 'bg-blue-100 text-blue-700'
    },
    {
      date: '2024-01-20',
      title: 'Security Update',
      description: 'Enhanced fraud detection algorithms and improved ticket validation security to keep your events safe.',
      tag: 'Security',
      tagColor: 'bg-red-100 text-red-700'
    },
    {
      date: '2024-01-15',
      title: 'Dashboard Redesign',
      description: 'Complete overhaul of the dashboard interface with improved user experience and faster load times.',
      tag: 'Enhancement',
      tagColor: 'bg-green-100 text-green-700'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <PublicNavbar />

      <div className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              What's New in
              <span className="text-primary-600"> FestFiti</span>
            </h1>
            <p className="text-xl text-gray-600">
              Stay up to date with the latest features, improvements, and updates to our platform.
            </p>
          </div>

          {/* Updates Timeline */}
          <div className="space-y-8">
            {updates.map((update, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-3 h-3 bg-primary-600 rounded-full mt-2"></div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${update.tagColor}`}>
                        {update.tag}
                      </span>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(update.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3">{update.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{update.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className="mt-16 bg-primary-50 rounded-2xl p-8 text-center border border-primary-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Stay Updated</h2>
            <p className="text-gray-600 mb-6">
              Subscribe to our newsletter to get the latest updates delivered to your inbox.
            </p>
            <div className="flex items-center max-w-md mx-auto gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2">
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
