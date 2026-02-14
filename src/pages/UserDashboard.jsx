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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="group relative bg-white rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                {/* Header Image */}
                <div className="h-32 bg-gray-200 relative overflow-hidden">
                  <img
                    src={ticket.image}
                    alt={ticket.eventName}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4 animate-fade-in">
                    <span
                      className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide backdrop-blur-md shadow-sm ${
                        ticket.status === 'active'
                          ? 'bg-white/90 text-green-700'
                          : 'bg-gray-100/90 text-gray-600'
                      }`}
                    >
                      {ticket.status === 'active' ? 'ACTIVE' : 'USED'}
                    </span>
                  </div>
                </div>

                {/* Overlapping "Avatar" (Event Icon/QR) */}
                <div className="relative flex justify-center -mt-10 mb-3">
                  <div className="p-1.5 bg-white rounded-full shadow-lg">
                    <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center border-2 border-gray-100 overflow-hidden">
                      <img 
                        src={`https://api.dicebear.com/9.x/icons/svg?seed=${ticket.eventName}`}
                        alt="Event Icon"
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="px-6 pb-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-1 leading-tight">
                    {ticket.eventName}
                  </h3>
                  <p className="text-gray-500 text-sm mb-6 flex items-center justify-center gap-1">
                     <MapPin className="w-3 h-3" />
                     {ticket.venue}
                  </p>

                  {/* Stats Row */}
                  <div className="bg-gray-50 rounded-2xl p-4 mb-6 grid grid-cols-3 gap-2 divide-x divide-gray-200">
                    <div className="text-center">
                      <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Date</div>
                      <div className="font-bold text-gray-800 text-sm">
                        {new Date(ticket.eventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Time</div>
                      <div className="font-bold text-gray-800 text-sm">{ticket.eventTime}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Type</div>
                      <div className="font-bold text-primary-600 text-sm">{ticket.ticketType}</div>
                    </div>
                  </div>

                  {/* Actions (Social Style) */}
                  <div className="flex items-center justify-between gap-4 border-t border-gray-100 pt-4">
                     <button 
                       onClick={() => handleDownloadQR(ticket)}
                       className="p-2 rounded-full hover:bg-gray-50 text-gray-400 hover:text-primary-600 transition-colors tooltip"
                       title="Download Ticket"
                     >
                       <Download className="w-5 h-5" />
                     </button>
                     
                     <button className="flex-1 bg-gray-900 text-white rounded-full py-2.5 px-4 font-medium text-sm hover:bg-black transition-all shadow-lg shadow-gray-200 flex items-center justify-center gap-2 group-hover:scale-105">
                       <QrCode className="w-4 h-4" />
                       Show QR Code
                     </button>

                     <div className="p-2 rounded-full text-gray-400">
                       <div className="w-5 h-5" /> {/* Spacer or extra icon */}
                     </div>
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
