import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import axios from "axios";
import { MapPin, Search, Filter, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";

const Tickets: React.FC = () => {
  const { data: user, authorization } = useSelector((state: RootState) => state.user);
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredTickets = tickets.filter((ticket) => ticket.eventId.title.toLowerCase().includes(searchTerm.toLowerCase()));

  if (loading) return <Loading />;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Tickets</h1>
          <p className="text-gray-500 mt-2">Manage all your event registrations and tickets.</p>
        </div>
      </header>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search events..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
          <Filter size={18} />
          <span>Filter</span>
        </button>
      </div>

      {/* Tickets List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Event</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Date</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Type</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredTickets.map((ticket) => (
                <tr
                  key={ticket._id}
                  className="hover:bg-gray-50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900">{ticket.eventId.title}</div>
                    <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                      <MapPin size={12} />
                      {ticket.eventId.location || "Online"}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-700">{new Date(ticket.eventId.startDate).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="capitalize">{ticket.ticketType}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${ticket.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                    >
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      to={`/dashboard/tickets/${ticket._id}`}
                      className="inline-flex items-center gap-1.5 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                    >
                      View Details <ExternalLink size={14} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredTickets.length === 0 && <div className="p-12 text-center text-gray-500">No tickets found.</div>}
      </div>
    </div>
  );
};

export default Tickets;
