import { Link, Route, Routes, useNavigate } from "react-router-dom";
import GoogleAuthButton from "../components/GoogleAuthButton";
import { useEffect, useState } from "react";
import SignInForm from "../components/forms/SignInForm";
import { FiMail } from "react-icons/fi";
import { signInSuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import VerificationForm from "../components/forms/VerificationForm";

const SignIn = () => {

  window.scrollTo(0, 0); //Scroll to top of page on page load

  const [formData, setFormData] = useState({});
  const [showSignInForm, setShowSignInForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Email from Form for verification
  const [verificationFormData, setVerificationFormData] = useState({});
  const [emailToVerify, setEmailToVerify] = useState(formData.email);
  const [emailToReverify, setEmailToReverify] = useState(formData.email);

  {/* Set's the email to be verified when sign in email changes */ }
  useEffect(() => {
    setEmailToVerify(formData.email);
    setEmailToReverify(formData.email);
  }, [formData.email]);

  const revealSignInForm = () => {
    setShowSignInForm(!showSignInForm);
  };

  {/* Sign In Form Handle Change and Handle Submit */ }
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setEmailToVerify(formData.email);
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
        if (res.status === 401) {
          setError('Please verify your email address or sign in with Google');
          setLoading(false);
          alert('Check your email for a verification code or sign in with Google')
          navigate('/signin/verify');
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

  {/* Verification Form Handle Change and Handle Submit */ }
  const handleVerifyChange = (event) => {
    setVerificationFormData({
      ...verificationFormData,
      [event.target.id]: event.target.value,
    });
  };

  const handleVerify = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const res = await fetch('/api/v1/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email: emailToVerify, verificationCode: verificationFormData.verificationCode }),
      });
      const data = await res.json();

      if (!res.ok) {
        setLoading(false);
        setError(data);
        return;
      }

      if (res.ok) {
        setLoading(false);
        setError(null);
        alert('Account verified. You can now proceed to sign in')
        navigate('/signin');
      }

    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const resendVerificationCode = async () => {
    setEmailToVerify(emailToReverify);
    try {
      setLoading(true);
      const res = await fetch('/api/v1/auth/resend-verification-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email: emailToReverify }),
      });
      const data = await res.json();

      if (!res.ok) {
        setLoading(false);
        setError(data);
        return;
      }

      if (res.ok) {
        setLoading(false);
        setError(null);
        alert('Verification code resent successfully')
      }

    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }

  return (
    <Routes>
      <Route path='/' element={
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

            <div className="text-center py-1">
              <Link className="text-red-400 text-sm" to={'/forgot-password'}>Forgot Password?</Link>
            </div>

          </div>
        </div>
      } />


      <Route path='/verify' element={
        <div className="mt-4 grow flex items-center justify-around max-w-md mx-auto">
          <div className="mb-64 text-center">
            <h1 className="text-4xl text-center mb-4">Verify Email</h1>
            <p>Please check your email {`${emailToVerify}`} for your verification code</p>

            {error && (
              <p className="text-red-400 text-sm pb-3">{error}</p>
            )}

            <VerificationForm
              handleVerifyChange={handleVerifyChange}
              handleVerify={handleVerify}
              resendVerificationCode={resendVerificationCode}
            />

            <div className="flex justify-between px-2">
              <Link className="underline text-black" to={'/signin'}>Sign In</Link>
              <button onClick={() => navigate(-1)}>Go back</button>
            </div>
          </div>
        </div>
      }
      />
    </Routes>

  )
}

export default SignIn