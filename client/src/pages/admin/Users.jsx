
import { useEffect, useState } from "react";
import UserCard from "../../components/UIelements/UserCard";
import Modal from "react-modal";
import ProfileUpdateForm from "../../components/forms/ProfileUpdateForm";
import Pagination from "../../components/UIelements/Pagination";


const Users = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // Pagination States
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 15;

    // Just to rerender the useEffect when Update Form is updated
    const [updateCount, setUpdateCount] = useState(0);

    useEffect(() => {
        const getUsersFromAPI = async () => {
            setLoading(true);
            const res = await fetch(`/api/v1/users/get/all?page=${currentPage}&limit=${limit}`);
            const data = await res.json();
            setUsers(data.users);
            setTotalPages(Math.ceil(data.totalUsers / limit));
            setLoading(false);
        };
        getUsersFromAPI();

        window.scroll({
            top: 0,
            behavior: 'smooth'
        });

    }, [updateCount, currentPage, totalPages]);

    const openEditModal = (user) => {
        setSelectedUser(user);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setSelectedUser(null);
        setIsEditModalOpen(false);
    };

    const openDeleteModal = (user) => {
        setSelectedUser(user);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    // Update the users list when the update form is submitted
    const handleUpdateUsers = () => {
        // Increment the ref value to trigger useEffect
        setUpdateCount(updateCount + 1);
    };

    const handleDeleteUser = async () => {
        const res = await fetch(`/api/v1/users/${selectedUser._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await res.json();
        handleUpdateUsers(); // To refresh the users list
        closeDeleteModal(); // To close the modal

        if (!res.ok) {
            console.log(data.message)
        }

        alert(`User has been deleted`)
        console.log(`User ${selectedUser.firstname} with email ${selectedUser.email} has been deleted`)
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
        <div>
            <h2 className="text-xl">All Users</h2>

            <ul role="list" className="divide-y divide-gray-100">
                {users.map((user) => (
                    <UserCard
                        key={user._id}
                        user={user}
                        openEditModal={() => openEditModal(user)}
                        openDeleteModal={() => openDeleteModal(user)}
                    />
                ))}
            </ul>

            {/* Update User Modal */}
            <Modal
                isOpen={isEditModalOpen}
                onRequestClose={closeEditModal}
                contentLabel="Update User Modal"
                ariaHideApp={false}
                className="fixed top-1/2 left-1/2 overflow-y-scroll transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-md md:max-w-md w-[85%] md:w-full"
                overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-20 flex items-center justify-center"
            >
                <ProfileUpdateForm
                    selectedUser={selectedUser}
                    onClose={closeEditModal}
                    closeModal={() => closeEditModal(selectedUser)}
                    openDeleteModal={() => openDeleteModal(selectedUser)}
                    updateUsers={handleUpdateUsers}
                />
            </Modal>

            {/* Delete User Modal */}
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
                        Are you sure you want to delete this user? <br />
                        {selectedUser?.firstname} with email {selectedUser?.email}
                    </p>
                    <div className="flex gap-2 mx-auto">
                        <button onClick={handleDeleteUser} className="bg-red-500 rounded-lg px-2 py-1">Yes, proceed</button>
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

export default Users