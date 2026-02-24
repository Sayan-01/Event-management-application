import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import axios from "axios";
import { Calendar, MapPin, Ticket, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";

const Dashboard: React.FC = () => {
  const { data: user, authorization } = useSelector((state: RootState) => state.user);
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const userId = (user as any)._id || (user as any).id;
        if (!userId) return;

        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}/tickets`, {
          headers: { Authorization: `Bearer ${authorization}` },
        });
        setTickets(response.data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [user, authorization]);

  if (loading) return <Loading />;

  const upcomingTickets = tickets.filter((t) => t.status === "active" && new Date(t.eventId.startDate) > new Date()).slice(0, 3);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {(user as any).name}!</h1>
        <p className="text-gray-500 mt-2">Here's what's happening with your events.</p>
      </header>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <Ticket size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Tickets</p>
              <p className="text-2xl font-bold text-gray-900">{tickets.filter((t) => t.status === "active").length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-50 text-green-600 rounded-xl">
              <Calendar size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Upcoming Events</p>
              <p className="text-2xl font-bold text-gray-900">{tickets.filter((t) => t.status === "active").filter((t) => new Date(t.eventId.startDate) > new Date()).length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Events Section */}
      <section>
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-xl font-bold text-gray-900">Your Next Events</h2>
          <Link
            to="/dashboard/tickets"
            className="text-blue-600 font-medium flex items-center gap-1 hover:gap-2 transition-all"
          >
            See all tickets <ArrowRight size={16} />
          </Link>
        </div>

        {upcomingTickets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingTickets.map((ticket) => (
              <Link
                key={ticket._id}
                to={`/dashboard/tickets/${ticket._id}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all border-b-4 border-b-blue-500"
              >
                <div className="p-6">
                  <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full mb-4">{ticket.ticketType.toUpperCase()}</span>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{ticket.eventId.title}</h3>
                  <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      {new Date(ticket.eventId.startDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} />
                      {ticket.eventId.location || "Online"}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 rounded-3xl border border-dashed border-gray-200 text-center">
            <div className="mx-auto w-16 h-16 bg-gray-50 flex items-center justify-center rounded-full mb-4">
              <Ticket
                className="text-gray-300"
                size={32}
              />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No upcoming events</h3>
            <p className="text-gray-500 mt-2">You haven't registered for any upcoming events yet.</p>
            <Link
              to="/events"
              className="inline-block mt-6 px-6 py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
            >
              Browse Events
            </Link>
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
