import { useEffect, useState } from "react";
import PropertyCardMini from "../../components/UIelements/PropertyCardMini";
import Pagination from "../../components/UIelements/Pagination";
import Modal from "react-modal";

const PropertiesAdmin = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Just to rerender the useEffect when Property is deleted
  const [updateCount, setUpdateCount] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 15;

  // Get Token from Client Cookie for API Call's Authorization Header
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');

  useEffect(() => {
    const getPropertiesfromAPI = async () => {
      setLoading(true);
      const res = await fetch(`/api/v1/properties/all?page=${currentPage}&limit=${limit}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      })
      const data = await res.json()
      setProperties(data.properties)
      setTotalPages(Math.ceil(data.totalProperties / limit))
      setLoading(false);
    };
    getPropertiesfromAPI();

    window.scroll({
      top: 100,
      behavior: 'smooth'
    });

  }, [currentPage, totalPages, updateCount]);

  const handleDeleteProperty = async () => {
    const res = await fetch(`/api/v1/properties/${selectedProperty._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();
    handleUpdateProperties(); // To refresh the properties list
    closeDeleteModal(); // To close the modal

    if (!res.ok) {
      console.log(data.message)
    }

    alert(`Property has been deleted`)
    console.log(`Property ${selectedProperty.title} with ID ${selectedProperty._id} has been deleted`)
  };

  // Update the properties list when a property is deleted
  const handleUpdateProperties = () => {
    // Increment the ref value to trigger useEffect
    setUpdateCount(updateCount + 1);
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

  const openDeleteModal = (property) => {
    setSelectedProperty(property);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="py-3">
      <h1 className="text-xl">All Properties:</h1>
      <p>Here are all existing properties sorted by date created:</p>

      {!properties || properties?.length === 0 &&
        <div className="text-xl font-medium mt-6">
          <p>No Properties Found</p>
        </div>
      }

      <div className="grid grid-cols-1 py-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {properties && properties
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((property) => (
            <PropertyCardMini
              key={property._id}
              property={property}
              openDeleteModal={() => openDeleteModal(property)}
            />
          ))
        }
      </div>

      {/* Delete Property Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        contentLabel="Delete User Modal"
        ariaHideApp={false}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-md max-w-md w-full"
        overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center"
      >

        <div className="flex flex-col space-y-4">
          <p className="mx-auto text-center">
            Are you sure you want to delete this property? <br />
            {selectedProperty?.title} with ID {selectedProperty?._id}
          </p>
          <div className="flex gap-2 mx-auto">
            <button onClick={handleDeleteProperty} className="bg-red-500 rounded-lg px-2 py-1">Yes, proceed</button>
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

export default PropertiesAdmin