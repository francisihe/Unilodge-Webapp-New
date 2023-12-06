import { Link, useNavigate } from "react-router-dom";
import GoogleAuthButton from "../components/GoogleAuthButton";
import { useState } from "react";
import SignInForm from "../components/forms/SignInForm";
import { FiMail } from "react-icons/fi";
import { signInSuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

const SignIn = () => {

  window.scrollTo(0, 0); //Scroll to top of page on page load

  const [formData, setFormData] = useState({});
  const [showSignInForm, setShowSignInForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const revealSignInForm = () => {
    setShowSignInForm(!showSignInForm);
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const res = await fetch('/api/v1/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        if (error) {
          setError(error);
          setLoading(false);
        } else {
          setError(data);
          setLoading(false);
          return;
        }
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/profile');
      }

    } catch (error) {
      setLoading(false);
      console.log(error);
    }

  };

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64 text-center">
        <h1 className="text-4xl text-center mb-4">Sign In</h1>

        {error && (
          <p className="text-red-400 text-sm pb-3">
            {error}
            {setTimeout(() => {
              setError(null)
            }, 10000)}
            {console.log(error)}</p>
        )}

        <GoogleAuthButton
          setError={setError}
        />

        <button
          onClick={revealSignInForm}
          className='w-full border-2 border-black my-1 py-2 px-3 rounded-2xl 
        hover:bg-blue-500 hover:text-white hover:scale-95 transition-transform'
        >
          <div className='flex items-center justify-center gap-3'>
            <span className='text-xl'><FiMail /></span>
            <span>Use Email and Password</span>
          </div>
        </button>

        {showSignInForm && (
          <SignInForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            loading={loading}
          />
        )}

        {!showSignInForm && (
          <div className="text-center py-2 text-gray-500">
            Do not have an account? <Link className="underline text-black" to={'/signup'}>Sign Up</Link>
          </div>
        )}

      </div>
    </div>
  )
}

export default SignIn