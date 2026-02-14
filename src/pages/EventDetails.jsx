import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Calendar, MapPin, Users, Clock, Share2, Heart,
  ArrowLeft, Ticket, CheckCircle, Shield, DollarSign
} from 'lucide-react';
import logo from '../assets/fest_fiti_name_logo_black.png';
import eventImage from '../assets/fest_fiti_mockup.jpg';

export default function EventDetailsPage() {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [ticketQuantity, setTicketQuantity] = useState(1);

  // Mock event data - in production would fetch from API based on eventId
  const event = {
    id: eventId,
    name: 'Nairobi Music Festival 2024',
    date: '2024-03-15',
    time: '18:00',
    endTime: '23:00',
    venue: 'Kenyatta International Convention Centre',
    location: 'Nairobi, Kenya',
    category: 'Music',
    image: eventImage,
    price: 5000,
    availableTickets: 450,
    totalCapacity: 5000,
    description: 'Experience the best of African music with top artists from across the continent. This year\'s festival features over 20 performances from award-winning musicians, cultural displays, and authentic African cuisine.',
    organizer: 'EventPro Kenya',
    features: [
      'Live performances from 20+ artists',
      'Food and beverage stalls',
      'VIP lounge access',
      'Free parking',
      'Security screening'
    ],
    schedule: [
      { time: '18:00', activity: 'Gates Open' },
      { time: '19:00', activity: 'Opening Performance' },
      { time: '20:00', activity: 'Main Acts Begin' },
      { time: '22:30', activity: 'Headliner Performance' },
      { time: '23:00', activity: 'Event Closes' }
    ]
  };

  const totalPrice = event.price * ticketQuantity;

  const handleBookNow = () => {
    navigate(`/book/${event.id}`, {
      state: { event, ticketQuantity, totalPrice }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/events')}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <img
                src={logo}
                alt="FestFiti"
                className="h-10 cursor-pointer"
                onClick={() => navigate('/')}
              />
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-primary-600">
                <Heart className="w-6 h-6" />
              </button>
              <button className="text-gray-600 hover:text-primary-600">
                <Share2 className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Event Image */}
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <img
                src={event.image}
                alt={event.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-semibold mb-3 inline-block">
                  {event.category}
                </span>
                <h1 className="text-4xl font-bold text-white">{event.name}</h1>
              </div>
            </div>

            {/* Event Info */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Event Details</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-primary-600 mt-1" />
                  <div>
                    <div className="font-semibold text-gray-900">Date</div>
                    <div className="text-gray-600">
                      {new Date(event.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-primary-600 mt-1" />
                  <div>
                    <div className="font-semibold text-gray-900">Time</div>
                    <div className="text-gray-600">{event.time} - {event.endTime}</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-primary-600 mt-1" />
                  <div>
                    <div className="font-semibold text-gray-900">Venue</div>
                    <div className="text-gray-600">{event.venue}</div>
                    <div className="text-gray-500 text-sm">{event.location}</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="w-5 h-5 text-primary-600 mt-1" />
                  <div>
                    <div className="font-semibold text-gray-900">Capacity</div>
                    <div className="text-gray-600">
                      {event.availableTickets} / {event.totalCapacity} available
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Event</h2>
              <p className="text-gray-700 leading-relaxed mb-6">{event.description}</p>

              <h3 className="font-semibold text-gray-900 mb-3">What's Included:</h3>
              <ul className="space-y-2">
                {event.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Schedule */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Event Schedule</h2>
              <div className="space-y-4">
                {event.schedule.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-20 text-primary-600 font-semibold">{item.time}</div>
                    <div className="flex-1 py-3 px-4 bg-gray-50 rounded-lg">
                      {item.activity}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Organizer */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Organized By</h2>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-primary-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-lg">{event.organizer}</div>
                  <div className="text-gray-600 text-sm">Verified Event Organizer</div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-lg sticky top-24">
              <div className="mb-6">
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  KES {event.price.toLocaleString()}
                </div>
                <div className="text-gray-600">per ticket</div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Tickets
                  </label>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setTicketQuantity(Math.max(1, ticketQuantity - 1))}
                      className="w-10 h-10 border-2 border-gray-300 rounded-lg hover:border-primary-600 transition-colors"
                      disabled={ticketQuantity <= 1}
                    >
                      -
                    </button>
                    <span className="text-2xl font-bold w-12 text-center">{ticketQuantity}</span>
                    <button
                      onClick={() => setTicketQuantity(Math.min(10, ticketQuantity + 1))}
                      className="w-10 h-10 border-2 border-gray-300 rounded-lg hover:border-primary-600 transition-colors"
                      disabled={ticketQuantity >= 10}
                    >
                      +
                    </button>
                  </div>
                  <div className="text-sm text-gray-500 mt-2">
                    Maximum 10 tickets per booking
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span className="text-primary-600">KES {totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleBookNow}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
              >
                <Ticket className="w-5 h-5" />
                <span>Book Now</span>
              </button>

              <div className="mt-6 space-y-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>Secure booking process</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Ticket className="w-4 h-4 text-green-500" />
                  <span>Instant ticket delivery</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <DollarSign className="w-4 h-4 text-green-500" />
                  <span>Free cancellation up to 24h</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
