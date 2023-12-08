import { useEffect, useState } from "react";
import Pagination from "../../components/UIelements/Pagination";
import BookingCardMaxi from "../../components/UIelements/BookingCardMaxi";
import Modal from "react-modal";
import BookingEditForm from "../../components/forms/BookingEditForm";

const BookingsAdmin = () => {

  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(false);

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [updateCount, setUpdateCount] = useState(0); // Just to rerender the useEffect when Update Form is updated

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 15;


  // Get Token from Client Cookie for API Call's Authorization Header
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');

  useEffect(() => {

    const getUserBookingsFromAPI = async () => {
      setLoading(true);
      const res = await fetch(`/api/v1/bookings/all?page=${currentPage}&limit=${limit}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      })
      const data = await res.json()
      setBookings(data.bookings)
      setTotalPages(Math.ceil(data.totalBookings / limit))
      setLoading(false);
    };

    getUserBookingsFromAPI();

    window.scroll({
      top: 100,
      behavior: 'smooth'
    });
  }, [currentPage, totalPages, updateCount]);

  const formatDate = (dateString) => {
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
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

  return (
    <div className="py-3">
      <h1 className="text-xl">All Bookings:</h1>
      <p>Here are the details of bookings sorted by inspection dates</p>

      {!bookings || bookings?.length === 0 &&
        <div className="text-xl font-medium mt-6">
          <p>No Bookings Found</p>
        </div>
      }

      <div className="grid grid-cols-1 py-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bookings && bookings
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

export default BookingsAdmin