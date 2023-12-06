import Pagination from "../components/UIelements/Pagination";
import BookingCardMini from "../components/UIelements/BookingCardMini";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SiIcon } from "react-icons/si";
//import axios from "axios";


const UserBookings = () => {
  const [bookings, setBookings] = useState([])
  const [todaysBookings, setTodaysBookings] = useState([])
  const { currentUser } = useSelector(state => state.user)
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 15;

  // Get Token from Client Cookie for API Call's Authorization Header
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');

  useEffect(() => {

    const getUserBookingsFromAPI = async () => {
      setLoading(true);
      const res = await fetch(`/api/v1/bookings/all/users/${currentUser._id}?page=${currentPage}&limit=${limit}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      });
      const data = await res.json()

      if (!res.ok) {
        console.log('Error Fetching User Bookings')
      }

      if (res.ok) {
        setBookings(data.userBookings)
        setTotalPages(Math.ceil(data.totalUserBookings / limit))
        setLoading(false);
        console.log('User Bookings Fetched Successfully')
      }
    };

    if (currentUser) {
      getUserBookingsFromAPI();
    }

    window.scroll({
      top: 100,
      behavior: 'smooth'
    });
  }, [currentPage, totalPages, currentUser]);

  // Set todays bookings after bookings are fetched
  useEffect(() => {
    if (bookings) {
      const todaysBookings = bookings.filter(booking => {
        const today = new Date();
        const bookingDate = new Date(booking.inspectionDate);
        return today.toDateString() === bookingDate.toDateString();
      });
      setTodaysBookings(todaysBookings);
    }
  }, [bookings]);

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
    <div className="py-3">
      <h1 className="text-2xl">Your Bookings:</h1>
      <p className="pb-3">Here are the details of your bookings sorted by inspection dates</p>

      {/* Today's User's Bookings */}
      {todaysBookings && todaysBookings?.length > 0 && (
        <button
          //onClick={() => setTodaysBookingsOpen(!todaysBookingsOpen)}
          className="w-full flex items-center gap-2 text-lg font-bold border-2 rounded-lg p-1 px-2 bg-orange-400">
          <SiIcon />
          Today&#8217;s Bookings
        </button>
      )}

      <div className="grid grid-cols-1 py-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {todaysBookings && todaysBookings
          .sort((a, b) => new Date(b.inspectionDate) - new Date(a.inspectionDate))
          .map((booking) => (
            <BookingCardMini
              key={booking._id}
              booking={booking}
            />
          ))
        }
      </div>

      {!bookings || bookings?.length === 0 &&
        <div className="text-xl font-medium mt-6">
          <p>No Bookings Found</p>
        </div>
      }

      {/* Other Bookings */}
      {bookings && bookings?.length > 0 && (
        <div>
          <button
            className="w-full flex items-center gap-2 text-lg font-bold border-2 rounded-lg p-1 px-2 bg-orange-400">
            <SiIcon />
            Other Bookings
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 py-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bookings && bookings
          .sort((a, b) => new Date(b.inspectionDate) - new Date(a.inspectionDate))
          .map((booking) => (
            <BookingCardMini
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

export default UserBookings