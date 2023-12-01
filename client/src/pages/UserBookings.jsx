import Pagination from "../components/UIelements/Pagination";
import BookingCardMini from "../components/UIelements/BookingCardMini";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


const UserBookings = () => {
  const [bookings, setBookings] = useState([])
  const { currentUser } = useSelector(state => state.user)
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 15;

  useEffect(() => {
    const getUserBookingsFromAPI = async () => {
      setLoading(true);
      const res = await fetch(`/api/v1/bookings/all/users/${currentUser._id}?page=${currentPage}&limit=${limit}`)
      const data = await res.json()
      setBookings(data.userBookings)
      setTotalPages(Math.ceil(data.totalUserBookings / limit))
      setLoading(false);
    };

    if (currentUser) {
      getUserBookingsFromAPI();
    }

    window.scroll({
      top: 100,
      behavior: 'smooth'
    });
  }, [currentPage, totalPages, currentUser]);


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
      <p>Here are the details of your bookings sorted by inspection dates</p>

      {!bookings || bookings?.length === 0 &&
        <div className="text-xl font-medium mt-6">
          <p>No Bookings Found</p>
        </div>
      }

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