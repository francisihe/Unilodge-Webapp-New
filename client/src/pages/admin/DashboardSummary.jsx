import { useEffect, useState } from "react";
import { SiIcon } from "react-icons/si";
import BookingCardMaxi from "../../components/UIelements/BookingCardMaxi";
import Pagination from "../../components/UIelements/Pagination";


const DashboardSummary = () => {
  const [dashboardSummaryOpen, setDashboardSummaryOpen] = useState(true);
  const [todaysBookingsOpen, setTodaysBookingsOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  const [todaysBookings, setTodaysBookings] = useState([]);
  const [todaysTotalBookings, setTodaysTotalBookings] = useState(0);

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProperties, setTotalProperties] = useState(0);
  const [totalFeaturedProperties, setTotalFeaturedProperties] = useState(0);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 15;


  useEffect(() => {
    const fetchTodaysBookings = async () => {
      setLoading(true);
      const res = await fetch('/api/v1/bookings/today');
      const data = await res.json();
      setTodaysBookings(data.bookings);
      setTodaysTotalBookings(data.totalBookings);
      setTotalPages(Math.ceil(data.totalBookings / limit));
      setLoading(false);
    };
    fetchTodaysBookings();

    const fetchSummaryNumbers = async () => {
      const res = await fetch('/api/v1/summary/all');
      const data = await res.json();
      setTotalUsers(data.totalUsers);
      setTotalProperties(data.totalProperties);
      setTotalFeaturedProperties(data.totalFeaturedProperties);
    };
    fetchSummaryNumbers();
  }, [currentPage, totalPages]);

  function getTodayDateWithWeekday() {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const today = new Date();
    const year = today.getFullYear();
    const month = months[today.getMonth()];
    const day = String(today.getDate());
    const weekday = weekdays[today.getDay()];

    return `${weekday}, ${day} ${month}, ${year}`;
  }
  const todaysDate = getTodayDateWithWeekday();

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="space-y-4">

      <div className="font-bold">Today&#8217;s Date: <div className="text-orange-700">{todaysDate}</div></div>

      {/* Dashboard Summary */}
      <div>
        <button
          onClick={() => setDashboardSummaryOpen(!dashboardSummaryOpen)}
          className="w-full flex items-center gap-2 text-lg font-bold border-2 rounded-lg p-1 px-2 bg-orange-400">
          <SiIcon />
          Dashboard Summary
        </button>

        {dashboardSummaryOpen && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-2">
            {/* Today's Total Bookings */}
            <div className="bg-gray-800 text-white p-4 rounded-md border-2 border-orange-500">
              <h2 className="text-lg font-semibold mb-2">Today&#8217;s Total Bookings</h2>
              <p className="text-3xl">{(!todaysTotalBookings || todaysTotalBookings === 0 ? '0' : todaysTotalBookings)}</p>
            </div>

            {/* Total Users */}
            <div className="bg-gray-800 text-white p-4 rounded-md border-2 border-green-500">
              <h2 className="text-lg font-semibold mb-2">Total Users</h2>
              <p className="text-3xl">{(!totalUsers || totalUsers === 0 ? '0' : totalUsers)}</p>
            </div>

            {/* Total Properties */}
            <div className="bg-gray-800 text-white p-4 rounded-md border-2 border-yellow-500">
              <h2 className="text-lg font-semibold mb-2">Total Properties</h2>
              <p className="text-3xl">{(!totalProperties || totalProperties === 0 ? '0' : totalProperties)}</p>
            </div>

            {/* Total Featured Properties */}
            <div className="bg-gray-800 text-white p-4 rounded-md border-2 border-blue-500">
              <h2 className="text-lg font-semibold mb-2">Total Featured Properties</h2>
              <p className="text-3xl">{(!totalFeaturedProperties || totalFeaturedProperties === 0 ? '0' : totalFeaturedProperties)}</p>
            </div>
          </div>
        )}
      </div>


      {/* Today's Bookings */}
      <div>
        <button
          onClick={() => setTodaysBookingsOpen(!todaysBookingsOpen)}
          className="w-full flex items-center gap-2 text-lg font-bold border-2 rounded-lg p-1 px-2 bg-orange-400">
          <SiIcon />
          Today&#8217;s Bookings
        </button>

        {
          todaysBookingsOpen &&
          (
            <div>
              {!todaysBookings || todaysBookings?.length === 0 &&
                <div className="text-xl font-medium mt-6">
                  <p>No Bookings Found For Today</p>
                </div>
              }

              <div className="grid grid-cols-1 py-2 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
                {todaysBookings && todaysBookings
                  .sort((a, b) => new Date(b.inspectionDate) - new Date(a.inspectionDate))
                  .map((booking) => (
                    <BookingCardMaxi
                      key={booking._id}
                      booking={booking}
                    />
                  ))
                }
              </div>

              <div className="flex justify-end py-2">
                {loading
                  ? ''
                  : <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onClickNextPage={handleNextPage}
                    onClickPrevPage={handlePrevPage}
                  />
                }
              </div>
            </div>
          )

        }
      </div>

    </div>
  )
}

export default DashboardSummary