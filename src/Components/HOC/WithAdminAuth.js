import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../Services/ApiService";

const WithAdminAuth = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkAdminStatus = async () => {
            try {
                const response = await ApiService.isAdmin();
                if (!response.data ) {

                    navigate("/signin");
                }
            } catch (error) {

                console.error("Error checking admin status:", error);
            }
        };


        checkAdminStatus();
    }, [navigate]);


    return <>{children}</>;
};

export default WithAdminAuth;
