import Error from "@/components/Error"
import Loading from "@/components/Loading"
import axios from "axios"
import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"

const Events = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [eventsData, setEventsData] = useState<IEvent[]>([])

    const [type, setType] = useState("")
    const [minPrice, setMinPrice] = useState("")
    const [maxPrice, setMaxPrice] = useState("")
    const [upcomingOnly, setUpcomingOnly] = useState(false)

    useEffect(() => {
        async function getEvents() {
            try {
                setLoading(true)
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/events`)
                setEventsData(res.data)
            } catch (error: any) {
                setError('Failed to fetch event data')
            } finally {
                setLoading(false)
            }
        }
        getEvents()
    }, [])

    const filteredEvents = useMemo(() => {
        return eventsData.filter((event) => {
            const eventDate = new Date(event.startDate)

            if (type && event.type !== type) return false

            if (minPrice && event.ticketPrice < Number(minPrice)) return false
            if (maxPrice && event.ticketPrice > Number(maxPrice)) return false

            // console.log(eventDate<new Date())
            // console.log(eventDate,new Date())
            if (upcomingOnly && eventDate < new Date()) return false

            return true
        })
    }, [eventsData, type, minPrice, maxPrice, upcomingOnly])

    if (error) {
        return <div className='wrapper min-h-[80vh] px-4'><Error /></div>
    }

    if (loading) {
        return <div className='wrapper min-h-[80vh] px-4'><Loading /></div>
    }

    return (
      <div className=" w-full flex flex-col max-w-6xl mx-auto p-5">
        <h1 className="text-3xl text-orange-600 mt-2 text-center">Discover What’s Happening Around You...</h1>

        <div className="flex gap-5 mt-10 flex-col sm:flex-row">
          <div className="w-full sm:w-[30%] border rounded-lg border-orange-400 p-5">
            <h1 className="text-2xl text-center mb-4">Filter</h1>

            <div className="mb-4">
              <label className="block mb-1">Event Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full border p-2 rounded"
              >
                <option value="">All</option>
                <option value="conference">Conference</option>
                <option value="wedding">Wedding</option>
                <option value="concert">Concert</option>
                <option value="corporate">Corporate</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-1">Min Price</label>
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1">Max Price</label>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={upcomingOnly}
                onChange={(e) => setUpcomingOnly(e.target.checked)}
              />
              <label>Upcoming Only</label>
            </div>
          </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2  gap-5 h-full">
            {filteredEvents.length === 0 && <p>No events found.</p>}

            {filteredEvents.map((event) => (
              <div
                key={event._id}
                className="group  border border-amber-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative h-48  overflow-hidden">
                  <img
                    src={
                      event.image ||
                      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    }
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-orange-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm border border-orange-100">
                      {event?.type}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-bold text-gray-800 line-clamp-1 group-hover:text-orange-600 transition-colors">{event.title}</h2>
                  </div>

                  <p className="text-gray-500 text-sm line-clamp-2 mb-2 min-h-[40px]">{event.description}</p>

                  <div className="flex items-center text-gray-400 text-xs mb-2 gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-orange-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="font-medium">{new Date(event.startDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                    <div>
                      <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">Entry Fee</p>
                      <p className="text-orange-600 text-xl font-extrabold">₹{event.ticketPrice}</p>
                    </div>
                    <Link to={`/event/${event._id}`}>
                      <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-orange-100 cursor-pointer active:scale-95">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
}

export default Events