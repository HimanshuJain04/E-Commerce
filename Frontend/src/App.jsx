import React, { useContext } from 'react'
import { AppContext } from './context/AppContext'
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'


function App() {

    const { isLoggedIn } = useContext(AppContext);

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
