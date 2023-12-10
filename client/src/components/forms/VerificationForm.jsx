/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";

const VerificationForm = ({ handleVerifyChange, handleVerify, resendVerificationCode }) => {

    const [countdown, setCountdown] = useState(0);

    const startCountdown = () => {
        setCountdown(300); // 5 minutes in seconds
    };

    useEffect(() => {
        let timer;

        if (countdown > 0) {
            timer = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [countdown]);

    const handleResendClick = () => {
        resendVerificationCode();
        startCountdown();
      };


    return (
        <form onSubmit={handleVerify} className="max-w-md mx-auto mt-6">
            <div className="flex gap-1">

                <input
                    type="number"
                    maxLength="6"
                    pattern="\d"
                    id='verificationCode'
                    onChange={handleVerifyChange}
                    className="border-2 border-black w-full text-center"
                    required
                />

            </div>

            <button
                className='w-full border-2 border-black bg-orange-600 text-white my-1 py-2 px-3 rounded-2xl 
        hover:bg-blue-500 hover:text-white hover:scale-95 transition-transform'
            >
                Verify
            </button>

            <button
                type='button'
                onClick={handleResendClick}
                disabled={countdown > 0}
                className={` w-full border-2 border-black my-1 py-2 px-3 rounded-2xl  ${countdown > 0 ? 'bg-gray-300 text-gray-500' : 'hover:bg-blue-500 hover:text-white hover:scale-95 transition-transform'}`}
            >
                Resend Code <b>{countdown > 0 ? `(${Math.floor(countdown / 60)}:${countdown % 60})` : ''}</b>
            </button>
        </form>
    )
}

export default VerificationForm