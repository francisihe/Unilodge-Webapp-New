import { useEffect } from "react";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

const VerifyUser = ({ children }) => {
    const navigate = useNavigate();
    const { currentUser } = useSelector(state => state.user)

    useEffect(() => {
        if (!currentUser) {
            navigate("/signin");
        }
    }, [currentUser, navigate]);

    return (
        (children)
    )
}

export default VerifyUser