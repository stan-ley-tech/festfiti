import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Ticket,
  QrCode,
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  Download,
  RefreshCw,
  TrendingUp,
  CheckCircle,
  XCircle,
  Search,
  Filter
} from 'lucide-react';

export default function UserDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock ticket data with realistic information
  const mockTickets = [
    {
      id: 'TKT001',
      eventName: 'Nairobi Music Festival 2024',
      eventDate: '2024-03-15',
      eventTime: '18:00',
      venue: 'Kenyatta International Convention Centre',
      location: 'Nairobi, Kenya',
      ticketType: 'VIP',
      price: 'KES 5,000',
      status: 'active',
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=TKT001-NAIROBI-MUSIC-2024',
      purchaseDate: '2024-02-10',
      image: '/src/assets/fest_fiti_mockup.jpg'
    },
    {
      id: 'TKT002',
      eventName: 'Tech Summit Africa',
      eventDate: '2024-04-20',
      eventTime: '09:00',
      venue: 'Safari Park Hotel',
      location: 'Nairobi, Kenya',
      ticketType: 'Regular',
      price: 'KES 8,000',
      status: 'active',
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=TKT002-TECH-SUMMIT-2024',
      purchaseDate: '2024-02-15',
      image: '/src/assets/fest_fiti_mockup.jpg'
    },
    {
      id: 'TKT003',
      eventName: 'Food & Wine Festival',
      eventDate: '2024-03-25',
      eventTime: '12:00',
      venue: 'Karura Forest',
      location: 'Nairobi, Kenya',
      ticketType: 'Regular',
      price: 'KES 3,500',
      status: 'active',
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=TKT003-FOOD-WINE-2024',
      purchaseDate: '2024-02-20',
      image: '/src/assets/fest_fiti_mockup.jpg'
    },
    {
      id: 'TKT004',
      eventName: 'Jazz Night at The Alchemist',
      eventDate: '2024-02-05',
      eventTime: '20:00',
      venue: 'The Alchemist',
      location: 'Nairobi, Kenya',
      ticketType: 'VIP',
      price: 'KES 2,500',
      status: 'used',
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=TKT004-JAZZ-NIGHT-2024',
      purchaseDate: '2024-01-25',
      image: '/src/assets/fest_fiti_mockup.jpg'
    }
  ];

  // Calculate stats
  const stats = {
    total: mockTickets.length,
    active: mockTickets.filter(t => t.status === 'active').length,
    used: mockTickets.filter(t => t.status === 'used').length,
    upcoming: mockTickets.filter(t => new Date(t.eventDate) > new Date() && t.status === 'active').length
  };

  // Filter tickets
  const filteredTickets = mockTickets.filter(ticket => {
    const matchesSearch = ticket.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.venue.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || ticket.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleExchangeTicket = () => {
    navigate('/user/exchange');
  };

  const handleDownloadQR = (ticket) => {
    // In a real app, this would download the QR code
    window.open(ticket.qrCode, '_blank');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-8 text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Welcome back, {user?.name || 'User'}! 👋
        </h1>
        <p className="text-primary-100 text-lg">
          Manage your event tickets and discover new experiences
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <Ticket className="w-8 h-8 text-blue-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-sm text-gray-600">Total Tickets</div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900">{stats.upcoming}</div>
          <div className="text-sm text-gray-600">Upcoming</div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-8 h-8 text-purple-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900">{stats.active}</div>
          <div className="text-sm text-gray-600">Active</div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <XCircle className="w-8 h-8 text-gray-400" />
          </div>
          <div className="text-3xl font-bold text-gray-900">{stats.used}</div>
          <div className="text-sm text-gray-600">Used</div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search tickets by event name or venue..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-500" />
            {['all', 'active', 'used'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filterStatus === status
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tickets Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">My Tickets</h2>
          <button
            onClick={() => navigate('/events')}
            className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
          >
            <span>Find More Events</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {filteredTickets.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
            <Ticket className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No tickets found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
            <button
              onClick={() => navigate('/events')}
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
            >
              Browse Events
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all"
              >
                {/* Ticket Header */}
                <div className="relative h-40 bg-gradient-to-br from-primary-400 to-primary-600">
                  <img
                    src={ticket.image}
                    alt={ticket.eventName}
                    className="w-full h-full object-cover opacity-50"
                  />
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        ticket.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {ticket.status === 'active' ? '✓ Active' : '✓ Used'}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white px-3 py-1 rounded-full inline-block">
                      <span className="text-xs font-semibold text-primary-600">
                        {ticket.ticketType}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Ticket Body */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                    {ticket.eventName}
                  </h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600 text-sm">
                      <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                      {new Date(ticket.eventDate).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                      {ticket.eventTime}
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="line-clamp-1">{ticket.venue}</span>
                    </div>
                  </div>

                  {/* QR Code Section */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-4 text-center">
                    <img
                      src={ticket.qrCode}
                      alt="QR Code"
                      className="w-32 h-32 mx-auto mb-2"
                    />
                    <p className="text-xs text-gray-500 font-mono">{ticket.id}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDownloadQR(ticket)}
                      className="flex-1 flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold transition-all text-sm"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                     {ticket.status === 'active' && (
                      <button
                        onClick={() => handleExchangeTicket()}
                        className="flex-1 flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-semibold transition-all text-sm"
                      >
                        <RefreshCw className="w-4 h-4" />
                        <span>Exchange</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
