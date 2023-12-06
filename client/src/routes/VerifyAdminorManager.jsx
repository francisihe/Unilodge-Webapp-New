/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const VerifyAdminOrManager = ({ children }) => {
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        if (!currentUser || !(currentUser.role === "admin" || currentUser.role === "manager")) {
            navigate(-1); // Redirect to home or another page if not an admin or manager
            alert("You need to be an admin or manager to view this page");
        }
    }, [currentUser, navigate]);

    return (
        (currentUser && (currentUser.role === "admin" || currentUser.role === "manager")) ?
            <>{children}</>
            :
            null
    );
};

export default VerifyAdminOrManager;