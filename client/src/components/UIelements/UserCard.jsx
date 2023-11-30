/* eslint-disable react/prop-types */
import { LiaUserEditSolid } from "react-icons/lia";
import { AiFillDelete } from "react-icons/ai";

const UserCard = ({ user, openEditModal, openDeleteModal }) => {
    return (
        <li key={user._id}
            className="flex justify-between items-center gap-x-6 py-5">

            <div className="flex min-w-0 gap-x-4">
                <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={user.avatar} alt="" />
                <div className="min-w-0 flex-auto">
                    <div className="flex gap-1">
                        <p className="text-md font-semibold leading-6 text-gray-900">{user.firstname}</p>
                        <p className="text-md font-semibold leading-6 text-gray-900">{user.lastname}</p>
                    </div>
                    <p className="mt-1 truncate text-sm leading-5 text-gray-500">{user.email}</p>

                    <div>
                        {user.role === 'admin' && (
                            <div className="mt-1 flex items-center gap-x-1.5">
                                <div className="flex-none rounded-full bg-red-500/20 p-1">
                                    <div className="h-1.5 w-1.5 rounded-full bg-red-600" />
                                </div>
                                <p className="text-xs leading-5 text-gray-500">{user.role}</p>
                            </div>
                        )}

                        {user.role === 'manager' && (
                            <div className="mt-1 flex items-center gap-x-1.5">
                                <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                </div>
                                <p className="text-xs leading-5 text-gray-500">{user.role}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="shrink-0 space-y-2 sm:flex sm:flex-col sm:items-end">
                <p className="flex text-xs leading-5 text-gray-500 justify-end">@{user.username}</p>
                <div className="flex gap-2 justify-end">
                    <button
                        type='button'
                        onClick={openEditModal}>
                        <LiaUserEditSolid className="h-6 w-6" />
                    </button>

                    <button
                        type='button'
                        onClick={openDeleteModal}>
                    <AiFillDelete className="h-6 w-6 text-red-500" />
                    </button>
                </div>

            </div>
        </li>
    )
}

export default UserCard