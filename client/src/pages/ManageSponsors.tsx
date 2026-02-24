import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { type RootState } from "../redux/store";

interface Sponsor {
  _id: string;
  companyName: string;
  tierName: string;
  benefits: string[];
  logoUrl: string;
  websiteUrl: string;
  createdAt: string;
}

const ManageSponsors: React.FC = () => {
  const { eventId } = useParams();
  const authorization = useSelector(
    (state: RootState) => state.user.authorization
  );

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const res = await axios.get(
          `${BACKEND_URL}/api/events/${eventId}/sponsors`,
          {
            headers: {
              Authorization: `Bearer ${authorization}`,
            },
          }
        );

        setSponsors(res.data);
      } catch (error: any) {
        toast.error(
          error.response?.data?.message || "Failed to fetch sponsors"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSponsors();
  }, [eventId, authorization]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-orange-400 text-lg">
        Loading Sponsors...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50 p-8">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-2xl p-8 border border-gray-200">
        <h1 className="text-2xl font-bold mb-6 text-orange-400">
          Active Sponsors
        </h1>

        {sponsors.length === 0 ? (
          <p className="text-gray-500">No active sponsors yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sponsors.map((sponsor) => (
              <div
                key={sponsor._id}
                className="border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition"
              >
                {/* Logo */}
                <div className="flex items-center justify-center mb-4">
                  <img
                    src={sponsor.logoUrl}
                    alt={sponsor.companyName}
                    className="h-16 object-contain"
                  />
                </div>

                {/* Company */}
                <h2 className="text-lg font-semibold text-center mb-1">
                  {sponsor.companyName}
                </h2>

                {/* Tier */}
                <p className="text-sm text-orange-400 font-medium text-center mb-3">
                  {sponsor.tierName} Sponsor
                </p>

                {/* Website */}
                <div className="text-center mb-3">
                  <a
                    href={sponsor.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 text-sm underline"
                  >
                    Visit Website
                  </a>
                </div>

                {/* Benefits */}
                <div className="mb-3">
                  <p className="text-sm font-medium mb-1">
                    Benefits:
                  </p>
                  <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                    {sponsor.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>

                {/* Created Date */}
                <p className="text-xs text-gray-400 text-center">
                  Joined on{" "}
                  {new Date(
                    sponsor.createdAt
                  ).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageSponsors;