import {Navigate, useNavigate} from "react-router";

const WithAuth = ({ children }) => {
    const token = localStorage.getItem("token");

    const  navigate=useNavigate()
    if (!token) return <Navigate to="/signin" />
    return <>{children}</>;
}

export default WithAuth;