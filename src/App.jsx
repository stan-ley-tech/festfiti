import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { EventProvider } from './context/EventContext';
import { AuthProvider } from './context/AuthContext';
import Layout from './layout/Layout';
import UserLayout from './layout/UserLayout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import PublicEvents from './pages/PublicEvents';
import EventDetails from './pages/EventDetails';
import BookEvent from './pages/BookEvent';
import Features from './pages/Features';
import Plans from './pages/Plans';
import Updates from './pages/Updates';
import Dashboard from './pages/Dashboard';
import UserDashboard from './pages/UserDashboard';
import TicketExchange from './pages/TicketExchange';
import Events from './pages/Events';
import TicketGuard from './pages/TicketGuard';
import Vendors from './pages/Vendors';
import Budget from './pages/Budget';
import Sustainability from './pages/Sustainability';
import FestBuddy from './pages/FestBuddy';
import ManageEvent from './pages/ManageEvent';
import UserSettings from './pages/UserSettings.jsx';
import NotFound from './pages/NotFound';
import ChatWindow from './components/ChatWindow';
import './styles/globals.css';

function App() {
  return (
    <AuthProvider>
      <EventProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/events" element={<PublicEvents />} />
              <Route path="/event/:eventId" element={<EventDetails />} />
              <Route path="/book/:eventId" element={<BookEvent />} />
              <Route path="/features" element={<Features />} />
              <Route path="/plans" element={<Plans />} />
              <Route path="/updates" element={<Updates />} />

              {/* User Dashboard Routes */}
              <Route path="/user" element={<UserLayout />}>
                <Route index element={<Navigate to="/user/dashboard" replace />} />
                <Route path="dashboard" element={<UserDashboard />} />
                <Route path="exchange" element={<TicketExchange />} />
                <Route path="settings" element={<UserSettings />} />
              </Route>

              {/* Admin Dashboard Routes - Event Organizers */}
              <Route path="/app" element={<Layout />}>
                <Route index element={<Navigate to="/app/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="events" element={<Events />} />
                <Route path="manage-event/:eventId" element={<ManageEvent />} />
                <Route path="ticketguard" element={<TicketGuard />} />
                <Route path="vendors" element={<Vendors />} />
                <Route path="budget" element={<Budget />} />
                <Route path="sustainability" element={<Sustainability />} />
                <Route path="festbuddy" element={<FestBuddy />} />
              </Route>

              {/* Catch-all route for 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>

            {/* Global Chat Window */}
            <ChatWindow />
          </div>
        </Router>
      </EventProvider>
    </AuthProvider>
  );
}

export default App;
