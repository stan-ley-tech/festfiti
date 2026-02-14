import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  ArrowRight, 
  Filter,
  Music,
  Briefcase,
  UtensilsCrossed,
  Trophy,
  Palette,
  Grid3x3,
  Building2
} from 'lucide-react';
import PublicNavbar from '../components/PublicNavbar';
import logo from '../assets/fest_fiti_name_logo_black.png';

export default function PublicEventsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock events data - in production this would come from API
  const events = [
    {
      id: '1',
      name: 'Nairobi Music Festival 2024',
      date: '2024-03-15',
      time: '18:00',
      venue: 'Kenyatta International Convention Centre',
      location: 'Nairobi, Kenya',
      category: 'Music',
      image: '/src/assets/fest_fiti_mockup.jpg',
      price: 'KES 5,000',
      availableTickets: 450,
      totalCapacity: 5000,
      description: 'Experience the best of African music with top artists from across the continent.',
      organizer: 'EventPro Kenya'
    },
    {
      id: '2',
      name: 'Tech Summit Africa',
      date: '2024-04-20',
      time: '09:00',
      venue: 'Safari Park Hotel',
      location: 'Nairobi, Kenya',
      category: 'Conference',
      image: '/src/assets/fest_fiti_mockup.jpg',
      price: 'KES 8,000',
      availableTickets: 200,
      totalCapacity: 500,
      description: 'Join industry leaders for two days of tech talks, networking, and innovation.',
      organizer: 'Tech Hub Kenya'
    },
    {
      id: '3',
      name: 'Food & Wine Festival',
      date: '2024-03-25',
      time: '12:00',
      venue: 'Karura Forest',
      location: 'Nairobi, Kenya',
      category: 'Food',
      image: '/src/assets/fest_fiti_mockup.jpg',
      price: 'KES 3,500',
      availableTickets: 800,
      totalCapacity: 1000,
      description: 'Taste the finest cuisines and wines from local and international chefs.',
      organizer: 'Gourmet Events'
    },
    {
      id: '4',
      name: 'Startup Pitch Night',
      date: '2024-04-10',
      time: '18:30',
      venue: 'iHub Nairobi',
      location: 'Nairobi, Kenya',
      category: 'Business',
      image: '/src/assets/fest_fiti_mockup.jpg',
      price: 'Free',
      availableTickets: 100,
      totalCapacity: 150,
      description: 'Watch innovative startups pitch to investors and compete for funding.',
      organizer: 'Innovation Hub'
    }
  ];

  const categories = [
    { id: 'all', label: 'All', icon: Grid3x3 },
    { id: 'Music', label: 'Music', icon: Music },
    { id: 'Conference', label: 'Conference', icon: Briefcase },
    { id: 'Food', label: 'Food', icon: UtensilsCrossed },
    { id: 'Business', label: 'Business', icon: Building2 },
    { id: 'Sports', label: 'Sports', icon: Trophy },
    { id: 'Arts', label: 'Arts', icon: Palette }
  ];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEventClick = (eventId) => {
    navigate(`/event/${eventId}`);
  };

  return (
    <div className="min-h-screen relative bg-gray-50">
      <PublicNavbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br mt-20 from-primary-600 to-primary-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Discover Amazing Events</h1>
          <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
            Find and book tickets for the best events happening around you
          </p>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search events by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-white shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-2 overflow-x-auto">
            <Filter className="w-5 h-5 text-gray-500 flex-shrink-0" />
            {categories.map((category) => {
              const CategoryIcon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-2 rounded-full font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                    selectedCategory === category.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <CategoryIcon className="w-4 h-4" />
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {filteredEvents.length} Events Found
          </h2>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="text-center py-20">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                onClick={() => handleEventClick(event.id)}
                className="group relative bg-white rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer"
              >
                {/* Header Image */}
                <div className="h-32 bg-gray-200 relative overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 right-4 animate-fade-in">
                    <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-wide backdrop-blur-md shadow-sm bg-white/90 text-primary-600">
                      {event.category}
                    </span>
                  </div>
                </div>

                {/* Overlapping "Avatar" (Event Icon) */}
                <div className="relative flex justify-center -mt-10 mb-3">
                  <div className="p-1.5 bg-white rounded-full shadow-lg">
                    <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center border-2 border-gray-100 overflow-hidden">
                      <img 
                        src={`https://api.dicebear.com/9.x/icons/svg?seed=${event.name}`}
                        alt="Event Icon"
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="px-6 pb-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-1 leading-tight group-hover:text-primary-600 transition-colors">
                    {event.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-6 flex items-center justify-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {event.venue}
                  </p>

                  {/* Stats Row */}
                  <div className="bg-gray-50 rounded-2xl p-4 mb-6 grid grid-cols-3 gap-2 divide-x divide-gray-200">
                    <div className="text-center">
                      <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Date</div>
                      <div className="font-bold text-gray-800 text-sm">
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Time</div>
                      <div className="font-bold text-gray-800 text-sm">{event.time}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Tickets</div>
                      <div className="font-bold text-primary-600 text-sm">{event.availableTickets}</div>
                    </div>
                  </div>

                  {/* Price & CTA Button */}
                  <div className="flex items-center justify-between gap-4 border-t border-gray-100 pt-4">
                    <div>
                      <div className="text-2xl font-bold text-primary-600">{event.price}</div>
                      <div className="text-xs text-gray-500">per ticket</div>
                    </div>
                    <button className="flex items-center gap-2 bg-primary-600 text-white rounded-full py-2.5 px-6 font-medium text-sm hover:bg-primary-700 transition-all shadow-lg shadow-primary-200 group-hover:scale-105">
                      <span>View Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img src={logo} alt="FestFiti" className="h-10 mx-auto mb-4 brightness-0 invert" />
          <p className="text-sm">
            &copy; 2026 FestFiti. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
