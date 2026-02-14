import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ArrowRight,
  Calendar,
  MapPin,
  Clock,
  Ticket,
  RefreshCw,
  CheckCircle,
  Filter,
  X
} from 'lucide-react';

export default function TicketExchange() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [message, setMessage] = useState('');

  // Mock available tickets for exchange
  const myTickets = [
    {
      id: 'TKT001',
      eventName: 'Nairobi Music Festival 2024',
      eventDate: '2024-03-15',
      eventTime: '18:00',
      venue: 'KICC',
      location: 'Nairobi, Kenya',
      ticketType: 'VIP',
      price: 'KES 5,000',
      category: 'Music',
      status: 'active',
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
      category: 'Conference',
      status: 'active',
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
      category: 'Food',
      status: 'active',
      image: '/src/assets/fest_fiti_mockup.jpg'
    }
  ];

  const categories = ['all', 'Music', 'Conference', 'Food', 'Sports', 'Arts'];

  const filteredTickets = myTickets.filter(ticket => {
    const matchesSearch = ticket.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.venue.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || ticket.category === selectedCategory;
    return matchesSearch && matchesCategory && ticket.status === 'active';
  });

  const handleExchangeRequest = () => {
    if (!recipientEmail) {
      alert('Please enter recipient email');
      return;
    }
    // In real app, this would call API
    alert(`Exchange request sent to ${recipientEmail}!`);
    setSelectedTicket(null);
    setRecipientEmail('');
    setMessage('');
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut'
      }
    },
    hover: {
      y: -8,
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-purple-600 via-primary-600 to-blue-600 rounded-2xl p-8 text-white relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full blur-3xl -ml-24 -mb-24" />
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-white bg-opacity-20 rounded-lg backdrop-blur-sm">
              <RefreshCw className="w-6 h-6" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">Ticket Exchange</h1>
          </div>
          <p className="text-purple-100 text-lg max-w-2xl">
            Transfer your tickets to friends or exchange with other attendees. Find the perfect match for your events.
          </p>
        </div>
      </motion.div>

      {/* Search and Filter Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
      >
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search your tickets by event name or venue..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-lg"
            />
          </div>

          {/* Category Filters */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            <Filter className="w-5 h-5 text-gray-500 flex-shrink-0" />
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-primary-600 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Results Count */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex items-center justify-between"
      >
        <h2 className="text-2xl font-bold text-gray-900">
          {filteredTickets.length} Ticket{filteredTickets.length !== 1 ? 's' : ''} Available
        </h2>
        <button
          onClick={() => navigate('/user/dashboard')}
          className="text-primary-600 hover:text-primary-700 font-semibold flex items-center space-x-2 transition-colors"
        >
          <span>Back to Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>

      {/* Tickets Grid */}
      {filteredTickets.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100"
        >
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Ticket className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No tickets found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
          >
            Clear Filters
          </button>
        </motion.div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredTickets.map((ticket, index) => (
              <motion.div
                key={ticket.id}
                layout
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                whileHover="hover"
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 cursor-pointer group"
                onClick={() => setSelectedTicket(ticket)}
              >
                {/* Ticket Header */}
                <div className="relative h-48 bg-gradient-to-br from-primary-400 to-purple-600 overflow-hidden">
                  <img
                    src={ticket.image}
                    alt={ticket.eventName}
                    className="w-full h-full object-cover opacity-40 group-hover:opacity-50 group-hover:scale-110 transition-all duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.3, type: 'spring' }}
                      className="px-3 py-1 bg-white text-primary-600 rounded-full text-xs font-semibold shadow-lg"
                    >
                      {ticket.category}
                    </motion.span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white bg-opacity-90 backdrop-blur-sm px-3 py-2 rounded-lg inline-block">
                      <span className="text-sm font-bold text-gray-900">{ticket.ticketType}</span>
                    </div>
                  </div>
                </div>

                {/* Ticket Body */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors">
                    {ticket.eventName}
                  </h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600 text-sm">
                      <Calendar className="w-4 h-4 mr-2 flex-shrink-0 text-primary-500" />
                      {new Date(ticket.eventDate).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <Clock className="w-4 h-4 mr-2 flex-shrink-0 text-primary-500" />
                      {ticket.eventTime}
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPin className="w-4 h-4 mr-2 flex-shrink-0 text-primary-500" />
                      <span className="line-clamp-1">{ticket.venue}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="text-2xl font-bold text-primary-600">{ticket.price}</div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-2 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-semibold shadow-md transition-all"
                    >
                      <span>Exchange</span>
                      <RefreshCw className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Exchange Modal */}
      <AnimatePresence>
        {selectedTicket && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTicket(null)}
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            />
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="bg-white rounded-2xl max-w-md w-full p-8 pointer-events-auto shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary-100 rounded-lg">
                      <RefreshCw className="w-6 h-6 text-primary-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Exchange Ticket</h3>
                  </div>
                  <button
                    onClick={() => setSelectedTicket(null)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="mb-6 p-4 bg-gradient-to-br from-primary-50 to-purple-50 rounded-xl border border-primary-100">
                  <p className="text-sm text-gray-600 mb-2">Exchanging ticket for:</p>
                  <p className="font-bold text-gray-900 text-lg">{selectedTicket.eventName}</p>
                  <p className="text-sm text-gray-600 mt-1">{selectedTicket.ticketType} • {selectedTicket.price}</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Recipient Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="recipient@example.com"
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Message (Optional)
                    </label>
                    <textarea
                      placeholder="Add a message to the recipient..."
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all resize-none"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedTicket(null)}
                    className="flex-1 px-6 py-3 border border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleExchangeRequest}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white rounded-xl font-semibold shadow-lg transition-all flex items-center justify-center space-x-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>Send Request</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
