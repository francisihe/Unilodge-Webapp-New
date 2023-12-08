import { useEffect, useState } from "react";
import { SiIcon } from "react-icons/si";
import BookingCardMaxi from "../../components/UIelements/BookingCardMaxi";
import Pagination from "../../components/UIelements/Pagination";
import BookingEditForm from "../../components/forms/BookingEditForm";
import Modal from "react-modal";

const DashboardSummary = () => {
  const [dashboardSummaryOpen, setDashboardSummaryOpen] = useState(true);
  const [todaysBookingsOpen, setTodaysBookingsOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  const [todaysBookings, setTodaysBookings] = useState([]);
  const [todaysTotalBookings, setTodaysTotalBookings] = useState(0);

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProperties, setTotalProperties] = useState(0);
  const [totalFeaturedProperties, setTotalFeaturedProperties] = useState(0);

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [updateCount, setUpdateCount] = useState(0); // Just to rerender the useEffect when Update Form is updated

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 15;

  // Get Token from Client Cookie for API Call's Authorization Header
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');

  useEffect(() => {

    const fetchSummaryNumbers = async () => {
      const res = await fetch('/api/v1/summary/all', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      });
      const data = await res.json();

      if (!res.ok) {
        console.log('Could not load summary numbers')
      }

      if (res.ok) {
        setTotalUsers(data.totalUsers);
        setTotalProperties(data.totalProperties);
        setTotalFeaturedProperties(data.totalFeaturedProperties);
        console.log('Summary numbers loaded')
      }

    };
    fetchSummaryNumbers();

    const fetchTodaysBookings = async () => {
      setLoading(true);
      const res = await fetch('/api/v1/bookings/today', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      });
      const data = await res.json();

      if (!res.ok) {
        console.log('Could not load todays bookings')
      }

      if (res.ok) {
        setTodaysBookings(data.bookings);
        setTodaysTotalBookings(data.totalBookings);
        setTotalPages(Math.ceil(data.totalBookings / limit));
        setLoading(false);
        console.log('Todays Bookings loaded')
      }

    };
    fetchTodaysBookings();

  }, [currentPage, totalPages, updateCount]);

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

  const formatDate = (dateString) => {
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const openEditModal = (booking) => {
    setSelectedBooking(booking);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedBooking(null);
    setIsEditModalOpen(false);
  };

  const openDeleteModal = (booking) => {
    setSelectedBooking(booking);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  // Update the bookings list when the update form is submitted
  const handleUpdateBookings = () => {
    // Increment the ref value to trigger useEffect
    setUpdateCount(updateCount + 1);
  };

  const handleDeleteBooking = async () => {
    const res = await fetch(`/api/v1/bookings/${selectedBooking._id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    });
    const data = await res.json();
    handleUpdateBookings(); // To refresh the bookings list
    closeDeleteModal(); // To close the modal

    if (!res.ok) {
      console.log(data)
    }

    alert(`Booking has been deleted`)
    console.log(`Booking ${selectedBooking?._id} with inspection date ${formatDate(selectedBooking?.inspectionDate)} has been deleted`)
  };

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
                      openEditModal={() => openEditModal(booking)}
                      openDeleteModal={() => openDeleteModal(booking)}
                    />
                  ))
                }
              </div>

              {/* Edit Booking Modal */}
              <Modal
                isOpen={isEditModalOpen}
                onRequestClose={closeEditModal}
                contentLabel="Update Booking Modal"
                ariaHideApp={false}
                className="fixed top-1/2 left-1/2 overflow-y-scroll transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-md md:max-w-md w-[85%] md:w-full"
                overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-20 flex items-center justify-center"
              >
                <BookingEditForm
                  selectedBooking={selectedBooking}
                  onClose={closeEditModal}
                  closeModal={() => closeEditModal(selectedBooking)}
                  openDeleteModal={() => openDeleteModal(selectedBooking)}
                  updateBookings={handleUpdateBookings}
                />
              </Modal>

              {/* Delete Booking Modal */}
              <Modal
                isOpen={isDeleteModalOpen}
                onRequestClose={closeDeleteModal}
                contentLabel="Delete Booking Modal"
                ariaHideApp={false}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-md max-w-md w-full"
                overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center"
              >

                <div className="flex flex-col space-y-4">
                  <p className="mx-auto text-center">
                    Are you sure you want to delete this booking? <br />< br />
                    Booking ID {selectedBooking?._id} with inspection date {formatDate(selectedBooking?.inspectionDate)}
                  </p>
                  <div className="flex gap-2 mx-auto">
                    <button onClick={handleDeleteBooking} className="bg-red-500 rounded-lg px-2 py-1">Yes, proceed</button>
                    <button onClick={closeDeleteModal} className="bg-green-500 rounded-lg px-2 py-1">No, return</button>
                  </div>
                </div>
              </Modal>

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