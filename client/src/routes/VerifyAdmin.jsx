/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const VerifyAdmin = ({ children }) => {
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        if (!currentUser || !currentUser?.role === "admin") {
            navigate(-1); // Redirect to home or another page if not an admin
            alert("You need to be an admin to view this page");
        }
    }, [currentUser, navigate]);

    return currentUser && currentUser?.role === "admin" ? <>{children}</> : null;
};

export default VerifyAdmin;