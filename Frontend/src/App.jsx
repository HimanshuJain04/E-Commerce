import React, { useContext, useEffect } from 'react'
import { AppContext } from './context/AppContext'
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import { ApiCalling } from './services/Api.js';


function App() {

    const { isLoggedIn, setIsLoggedIn } = useContext(AppContext);

    useEffect(() => {
        const validate = async () => {
            // validate the user
            const response = await ApiCalling("GET", "auth/validate");

            if (response.success) {
                setIsLoggedIn(response.data)
            }

        }
        validate();
    }, []);

    return (
        <div>
            <ToastContainer />
            <div>
                {
                    isLoggedIn && isLoggedIn.role === "Admin" ? (
                        <AdminDashboard />
                    ) : (
                        <UserDashboard />
                    )
                }
            </div>
        </div>
    )
}

export default App;
