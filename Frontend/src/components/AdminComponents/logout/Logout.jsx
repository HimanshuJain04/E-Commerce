import React, { useContext, useEffect } from 'react'
import { ApiCalling } from '../../../services/Api';
import { AppContext } from '../../../context/AppContext';
import { useNavigate } from "react-router-dom"

function Logout() {

    const { isLoggedIn, setIsLoggedIn } = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {

        const logout = async () => {

            const res = await ApiCalling("GET", `auth/logout`);

            if (res.success) {
                setIsLoggedIn(null);
                navigate("/")
            }
        }

        if (isLoggedIn) {
            logout();
        }

    }, []);

    return (
        <div className='flex justify-center items-center h-[100vh]'>
            <div className='text-4xl font-semibold text-white shadow-xl bg-blue-700 rounded-md px-10 py-5'>
                LogOut
            </div>
        </div>
    )
}

export default Logout
