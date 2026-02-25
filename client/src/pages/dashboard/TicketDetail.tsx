import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { type RootState } from "../../redux/store";
import axios from "axios";
import { Calendar, MapPin, Clock, ArrowLeft, Download, Ban, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import Loading from "../../components/Loading";

const TicketDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authorization } = useSelector((state: RootState) => state.user);
  const [ticket, setTicket] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/registrations/${id}`, {
          headers: { Authorization: `Bearer ${authorization}` },
        });
        setTicket(response.data);
      } catch (error) {
        console.error("Error fetching ticket:", error);
        toast.error("Failed to load ticket details");
        navigate("/dashboard/tickets");
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id, authorization, navigate]);

  const handleCancel = async () => {
    if (!window.confirm("Are you sure you want to cancel this registration? This action cannot be undone.")) return;

    setCancelling(true);
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/registrations/${id}`, {
        headers: { Authorization: `Bearer ${authorization}` },
      });
      toast.success("Registration cancelled successfully");
      setTicket({ ...ticket, status: "cancelled" });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to cancel registration");
    } finally {
      setCancelling(false);
    }
  };

  if (loading) return <Loading />;
  if (!ticket) return null;

  const event = ticket.eventId;
  const isCancelled = ticket.status === "cancelled";

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in zoom-in-95 duration-500">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-6"
      >
        <ArrowLeft size={20} />
        <span className="font-medium">Back to Tickets</span>
      </button>

      <div className="bg-white rounded-3xl shadow-xl shadow-amber-500/5 overflow-hidden border border-gray-100">
        {/* Header Header */}
        <div className="bg-amber-600 p-8 text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex justify-between items-start">
              <div>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold tracking-wider uppercase">{ticket.ticketType} Ticket</span>
                <h1 className="text-3xl font-bold mt-4">{event.title}</h1>
              </div>
              {isCancelled && (
                <div className="bg-red-500 text-white px-4 py-1.5 rounded-xl font-bold flex items-center gap-2 animate-bounce">
                  <AlertCircle size={18} />
                  CANCELLED
                </div>
              )}
            </div>
          </div>
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-48 h-48 bg-amber-400/20 rounded-full blur-2xl"></div>
        </div>

        <div className="p-8 grid md:grid-cols-3 gap-8">
          {/* Info Column */}
          <div className="md:col-span-2 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-gray-600">
                <div className="w-10 h-10 bg-gray-50 flex items-center justify-center rounded-xl">
                  <Calendar
                    className="text-amber-600"
                    size={20}
                  />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Date</p>
                  <p className="font-semibold text-gray-900">{new Date(event.startDate).toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-gray-600">
                <div className="w-10 h-10 bg-gray-50 flex items-center justify-center rounded-xl">
                  <Clock
                    className="text-amber-600"
                    size={20}
                  />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Time</p>
                  <p className="font-semibold text-gray-900">{new Date(event.startDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-gray-600">
                <div className="w-10 h-10 bg-gray-50 flex items-center justify-center rounded-xl">
                  <MapPin
                    className="text-amber-600"
                    size={20}
                  />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Location</p>
                  <p className="font-semibold text-gray-900">{event.location || "Online Event"}</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 italic text-gray-500 text-sm">* Please present this ticket at the entrance. The QR code will be scanned for verification.</div>
          </div>

          {/* QR Code Column */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className={`p-4 bg-white border-2 ${isCancelled ? "border-gray-200 opacity-50" : "border-amber-100"} rounded-2xl shadow-inner`}>
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${ticket._id}`}
                alt="QR Code"
                className="w-32 h-32"
              />
            </div>
            <p className="text-xs font-mono text-gray-400">#{ticket._id.substring(ticket._id.length - 8)}</p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-gray-50 p-6 flex flex-wrap gap-4 justify-between items-center border-t border-gray-100">
          <button
            disabled={isCancelled}
            className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Download size={18} />
            Download PDF
          </button>

          {!isCancelled && (
            <button
              onClick={handleCancel}
              disabled={cancelling}
              className="flex items-center gap-2 px-6 py-2.5 text-red-600 font-bold hover:bg-red-50 rounded-xl transition-all"
            >
              <Ban size={18} />
              {cancelling ? "Cancelling..." : "Cancel Registration"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;
