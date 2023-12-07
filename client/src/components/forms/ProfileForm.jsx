/* eslint-disable react-hooks/exhaustive-deps */
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { app } from "../../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { updateUserSuccess } from "../../redux/user/userSlice";
import { signOutUserSuccess } from "../../redux/user/userSlice.js";
import { signOutUser } from "../../utils/signOutUser.js";

const ProfileForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const { currentUser } = useSelector((state) => state.user);

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
        const res = await fetch(`/api/v1/users/${currentUser._id}/profile`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        const data = await res.json();

        if (!res.ok) {
            setError(data);
            console.log('Error Updating Profile')
            setLoading(false);
        }

        if (res.ok) {
            dispatch(updateUserSuccess(data));
            setLoading(false);
            setError(null);
            setMessage('Profile Updated Successfully')
        }
    };

    const handleSignOut = async () => {
        // Dispatch logout action to clear Redux state
        dispatch(signOutUserSuccess());
        await signOutUser(); // Clears the token from localStorage
        navigate('/')
    };

    return (
        <div>
            <p>
                You can create your username, update your personal details and see your past and future bookings here
            </p>

            <form onSubmit={handleSubmit} className="border-2 px-4 py-4 rounded-2xl flex flex-col my-4 space-y-3 md:mx-auto md:w-3/5 lg:mx-auto lg:w-full ">
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
                        src={formData?.avatar || currentUser?.avatar}
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

                    <label className="text-xs text-orange-500 font-medium">Firstname</label>
                    <input
                        type='text'
                        id='firstname'
                        placeholder='Francis'
                        defaultValue={currentUser?.firstname}
                        onChange={handleChange}
                    />

                    <label className="text-xs text-orange-500 font-medium">Lastname</label>
                    <input
                        type='text'
                        id='lastname'
                        placeholder='Ihejirika'
                        defaultValue={currentUser?.lastname}
                        //value={formData.lastname}
                        onChange={handleChange}
                    />

                    <label className="text-xs text-orange-500 font-medium">Email Address</label>
                    <input
                        type='email'
                        id='email'
                        placeholder='francisdev@gmail.com'
                        defaultValue={currentUser?.email}
                        onChange={handleChange}
                        disabled
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
                        defaultValue={currentUser?.username}
                        onChange={handleChange}
                        required
                    />

                    <div className="text-center">
                        <button
                            type='submit'
                            className="bg-orange-500 text-white rounded-xl py-2 px-4 mt-3 w-full"
                        >
                            {loading ? 'Updating...' : 'Update Profile'}
                        </button>

                        <Link to='/profile/bookings'>
                            <button
                                type='button'
                                className="bg-green-800 text-white rounded-xl py-2 px-4 mt-3 w-full"
                            >
                                See Bookings
                            </button>
                        </Link>

                        <button
                            type='button'
                            onClick={handleSignOut}
                            className="bg-red-500 text-white rounded-xl py-2 px-4 mt-3 w-1/2"
                        >
                            Sign Out
                        </button>
                    </div>

                    {/* Error or Success Message On Submission */}
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    {message && <p className="text-green-500 text-sm">{message}</p>}
                </div>
            </form>
        </div>
    )
}

export default ProfileForm