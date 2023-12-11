import { Link, Route, Routes, useNavigate } from "react-router-dom";
import GoogleAuthButton from "../components/GoogleAuthButton";
import { useEffect, useState } from "react";
import SignUpForm from "../components/forms/SignUpForm";
import { FiMail } from "react-icons/fi";
import VerificationForm from "../components/forms/VerificationForm";

const SignUp = () => {

  window.scrollTo(0, 0); //Scroll to top of page on page load
  const navigate = useNavigate();


  const [formData, setFormData] = useState({});
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  //Email from Form for verification
  const [verificationFormData, setVerificationFormData] = useState({});
  const [emailToVerify, setEmailToVerify] = useState(formData.email);
  const [emailToReverify, setEmailToReverify] = useState(formData.email);

  useEffect(() => {
    console.log('formData.email in useEffect:', formData.email);
    setEmailToVerify(formData.email);
    setEmailToReverify(formData.email);
  }, [formData.email]);

  const revealSignUpForm = () => {
    setShowSignUpForm(!showSignUpForm);
  };

  {/* Sign Up Form Handle Change and Handle Submit */ }
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value.replace(/\s/g, ''),
      //Used regex to prevent spaces in the fields input
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if passwords match
    if (formData.password !== formData['passwordConfirm']) {
      setError('Passwords do not match');
      return;
    }

    try {
      setEmailToVerify(formData.email);
      setLoading(true);
      const res = await fetch('/api/v1/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
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
        navigate('/signup/verify');
      }

    } catch (error) {
      setLoading(false);
      setError(error.message);
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
    console.log(verificationFormData)
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
        setMessage('Account created successfully. Proceed to Sign In');
        alert('Account created successfully. Proceed to Sign In')
        navigate('/signin');
      }

    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const resendVerificationCode = async () => {
    console.log('emailToReverify before fetch:', emailToReverify);
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
      <Route path='/'
        element={
          <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64 text-center">
              <h1 className="text-4xl text-center mb-4">Create account</h1>

              {message && (
                <p className="text-green-400 text-sm pb-3">
                  {message}
                  {setTimeout(() => {
                    setMessage(null)
                  }, 10000)}
                  {console.log(message)}</p>

              )}

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
                onClick={revealSignUpForm}
                className='w-full border-2 border-black my-1 py-2 px-3 rounded-2xl 
        hover:bg-blue-500 hover:text-white hover:scale-95 transition-transform'
              >
                <div className='flex items-center justify-center gap-3'>
                  <span className='text-xl'><FiMail /></span>
                  <span>Continue with Email</span>
                </div>
              </button>

              {!showSignUpForm && (
                <div className="text-center py-2 text-gray-500">
                  Already have an account? <Link className="underline text-black" to={'/signin'}>Sign In</Link>
                </div>
              )}

              <div className="text-center py-1">
                <Link className="text-red-400 text-sm" to={'/forgot-password'}>Forgot Password?</Link>
              </div>

              {showSignUpForm && (
                <SignUpForm
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  loading={loading}
                />
              )}

            </div>
          </div>
        }
      />

      <Route path='/verify'
        element={
          <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64 text-center">
              <h1 className="text-4xl text-center mb-4">Verify Email</h1>
              <p>Please check your email {`${emailToVerify}`} for your verification code</p>

              {message && (
                <p className="text-green-400 text-sm pb-3">{message}</p>
              )}

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

export default SignUp