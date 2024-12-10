import React from "react";
import { useStateContext } from "../contexts/StateContext";


const LogoutButton = () => {
    const { setToken } = useStateContext();

    const handleLogout = () => {
        authLogout
            .then(() => {
                setToken(null); 
                localStorage.removeItem("ACCESS_TOKEN"); 
            })
            .catch((error) => {
                console.error("Logout failed", error);
            });
    };

    return (
        <button
            onClick={handleLogout}
            className="flex justify-center items-center px-4 py-2 rounded-md bg-white text-black ease-in-out"
        >
            Logout
        </button>
    );
};

export default LogoutButton;