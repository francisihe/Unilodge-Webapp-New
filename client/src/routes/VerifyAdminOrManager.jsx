/* eslint-disable react/prop-types */
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOutUser } from "../utils/signOutUser.js";

const VerifyAdminOrManager = ({ children }) => {
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);

    // Get Token from Client Cookie for API Call's Authorization Header
    const token = document.cookie?.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');


    useEffect(() => {
        const authenticateUser = async () => {
            if (!currentUser || !(currentUser.role === "admin" || currentUser.role === "manager")) {
                alert("You need to be an admin or manager to view this page");
                navigate("/signin"); // Redirect to home or another page if not an admin or manager
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
        }
        authenticateUser();

    }, [currentUser, navigate, token]);

    return (
        (currentUser && (currentUser.role === "admin" || currentUser.role === "manager")) ?
            <>{children}</>
            :
            null
    );
};

export default VerifyAdminOrManager;