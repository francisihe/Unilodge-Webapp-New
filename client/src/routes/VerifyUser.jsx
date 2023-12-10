import { useEffect } from "react";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import { signOutUser } from "../utils/signOutUser.js";

const VerifyUser = ({ children }) => {
    const navigate = useNavigate();
    const { currentUser } = useSelector(state => state.user)

    // Get Token from Client Cookie for API Call's Authorization Header
    const token = document.cookie?.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');


    useEffect(() => {
        // Check for logged in user and token expiration locally
        const authenticateUser = async () => {
            if (!currentUser || !token) {
                // Remove token from localStorage
                localStorage.removeItem('token');
                console.log('Token removed');
                localStorage.removeItem('persist:root');
                console.log('persist:root removed');
                
                navigate("/signin");
                return;
            }

            try {
                const decodedToken = jwtDecode(token);

                if (Date.now() >= decodedToken.exp * 1000) {
                    await signOutUser();
                    alert('Your session has expired. Please sign in again.');
                    navigate("/signin");
                    return;
                }
            } catch (error) {
                if (error.status === 401) {
                    alert('Your session has expired. Please sign in again.');
                    navigate("/signin");
                    return;
                }
                navigate("/signin");
            }
        };
        authenticateUser();
    }, [currentUser, navigate, token]);

    return (
        (children)
    )
}

export default VerifyUser


// const VerifyUser = ({ children }) => {
//     const navigate = useNavigate();
//     const { currentUser } = useSelector(state => state.user)

//     // Get Token from Client Cookie for API Call's Authorization Header
//     const token = document.cookie?.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
//     console.log('Raw Token:', token);

//     try {
//         const decodedToken = jwtDecode(token);
//         console.log('Decoded Token:', decodedToken);
//     } catch (error) {
//         console.error('Token Decoding Error:', error);
//     }

//     useEffect(() => {
//         // Check for logged in user and token expiration locally
//         const authenticateUser = async () => {
//             if (!currentUser || !token) {
//                 // Remove token from localStorage
//                 localStorage.removeItem('token');
//                 console.log('Token removed');
//                 localStorage.removeItem('persist:root');
//                 console.log('persist:root removed');
                
//                 navigate("/signin");
//                 return;
//             }

//             try {
//                 const decodedToken = jwtDecode(token);
//                 console.log('Decoded Token:', decodedToken);

//                 if (Date.now() >= decodedToken.exp * 1000) {
//                     await signOutUser();
//                     alert('Your session has expired. Please sign in again.');
//                     navigate("/signin");
//                     return;
//                 }
//             } catch (error) {
//                 if (error.status === 401) {
//                     alert('Your session has expired. Please sign in again.');
//                     navigate("/signin");
//                     return;
//                 }
//                 console.error('Token Decoding Error:', error);
//                 navigate("/signin");
//             }
//         };
//         authenticateUser();
//     }, [currentUser, navigate, token]);

//     return (
//         (children)
//     )
// }

// export default VerifyUser