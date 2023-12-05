/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { app } from "../../utils/firebase";
import { useDispatch } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import { updateUserSuccess } from "../../redux/user/userSlice";

const ProfileUpdateForm = ({ selectedUser, closeModal, openDeleteModal, updateUsers }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fileRef = useRef(null);
    const [file, setFile] = useState(undefined);
    const [filePerc, setFilePerc] = useState(0);
    const [fileUploadError, setFileUploadError] = useState(false);

    useEffect(() => {
        if (file) {
            handleFileUpload(file);
        }
    }, [file]);

    const handleFileUpload = (file) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setFilePerc(Math.round(progress));
            },
            // eslint-disable-next-line no-unused-vars
            (_error) => {
                setFileUploadError(true);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
                    setFormData({ ...formData, avatar: downloadURL })
                );
            }
        );
    };

    const handleChange = (event) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [event.target.id]: event.target.value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading(true);
        const res = await fetch(`/api/v1/users/${selectedUser._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        const data = await res.json();

        if (!res.ok) {
            setError(data.message)
            setLoading(false);
        }

        if (res.ok) {
            // On update, refresh the user data on the users page
            await updateUsers();

            dispatch(updateUserSuccess(data));
            setLoading(false);
            alert('User Updated Successfully')
            console.log('User Updated Successfully')
        }

    };

    return (
        <div>
            <div className="flex items-center justify-between">
                <h1>Profile Update Form</h1>
                <button onClick={closeModal}>
                    <RxCross2
                        className="text-xl text-red-500"
                    />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="border-2 px-4 py-4 rounded-2xl flex flex-col my-4 space-y-3 md:mx-auto md:w-full lg:mx-auto lg:w-full ">
                <div>
                    <div className="flex justify-between items-baseline">
                        <div>
                            <input
                                onChange={(e) => setFile(e.target.files[0])}
                                type='file'
                                ref={fileRef}
                                hidden
                                accept='image/*'
                            />
                            <img
                                onClick={() => fileRef.current.click()}
                                src={formData?.avatar || selectedUser?.avatar}
                                alt='profile'
                                className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
                            />

                            <p className='text-sm self-center'>
                                {fileUploadError ? (
                                    <span className='text-red-700'>
                                        Error Image upload (image must be less than 2 mb)
                                    </span>
                                ) : filePerc > 0 && filePerc < 100 ? (
                                    <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
                                ) : filePerc === 100 ? (
                                    <span className='text-green-700'>Image successfully uploaded!</span>
                                ) : (
                                    ''
                                )}
                            </p>
                        </div>
                        <div className="visible md:invisible">
                            <button onClick={closeModal}>
                                <RxCross2
                                    className="text-xl text-red-500"
                                />
                            </button>
                        </div>
                    </div>

                    <label className="text-xs text-orange-500 font-medium">User ID</label>
                    <input
                        type='text'
                        id='_id'
                        placeholder=''
                        defaultValue={selectedUser?._id}
                        onChange={handleChange}
                        disabled
                    />

                    <label className="text-xs text-orange-500 font-medium">Firstname</label>
                    <input
                        type='text'
                        id='firstname'
                        placeholder='Francis'
                        defaultValue={selectedUser?.firstname}
                        onChange={handleChange}
                    />

                    <label className="text-xs text-orange-500 font-medium">Lastname</label>
                    <input
                        type='text'
                        id='lastname'
                        placeholder='Ihejirika'
                        defaultValue={selectedUser?.lastname}
                        onChange={handleChange}
                    />

                    <label className="text-xs text-orange-500 font-medium">Email Address</label>
                    <input
                        type='email'
                        id='email'
                        placeholder='francisdev@gmail.com'
                        defaultValue={selectedUser?.email}
                        onChange={handleChange}
                    />

                    <label className="text-xs text-orange-500 font-medium">Password</label>
                    <input
                        type='password'
                        id='password'
                        placeholder='********'
                        onChange={handleChange}
                    />

                    <label className="text-xs text-orange-500 font-medium">Username</label>
                    <input
                        type='text'
                        id='username'
                        placeholder='francisihej'
                        defaultValue={selectedUser?.username}
                        onChange={handleChange}
                        required
                    />

                    <label className="text-xs text-orange-500 font-medium">User role</label>
                    <select
                        id='role'
                        onChange={handleChange}
                        className="text-sm w-full border my-1 py-2 px-3 rounded-2xl bg-inherit"
                        defaultValue={selectedUser?.role}
                        required
                    >
                        <option value=''>Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="manager">Manager</option>
                        <option value="user">User</option>
                    </select>

                    <button
                        type='submit'
                        className="bg-green-700 text-white rounded-xl py-2 px-4 mt-3 w-full"
                    >
                        {loading ? 'Updating...' : 'Update Profile'}
                    </button>


                    <button
                        type='button'
                        onClick={openDeleteModal}
                        className="bg-red-500 text-white rounded-xl py-2 px-4 mt-3 w-full"
                    >
                        Delete User
                    </button>


                    {/* Error Message On Submission */}
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                </div>
            </form>
        </div>
    )
}

export default ProfileUpdateForm