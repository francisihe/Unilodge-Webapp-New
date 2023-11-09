import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../utils/firebase.js'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInSuccess } from '../redux/user/userSlice.js';
import { FcGoogle } from 'react-icons/fc';

const GoogleAuthButton = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            provider.setCustomParameters({ prompt: 'select_account' });
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);

            console.log('Pop Up attempted' ,result)
            const res = await fetch('/api/v1/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                }),
            });

            console.log('api data call made')
            const data = await res.json();

            console.log('api data received', data)
            dispatch(signInSuccess(data));
            navigate('/');

        } catch (error) {
            console.log('Could not sign in with google', error);
        }
    };

    return (
        <button
            onClick={handleGoogleClick}
            type='button'
            className='w-full border-2 border-black my-1 py-2 px-3 rounded-2xl 
            hover:bg-black hover:text-white hover:scale-95 transition-transform'
        >
            <div className='flex items-center justify-center gap-3'>
                <span className='text-xl'><FcGoogle /></span>
                <span>Continue with Google</span>
            </div>
        </button>
    );
}

export default GoogleAuthButton