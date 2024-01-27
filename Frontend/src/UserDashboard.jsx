import { toast } from 'react-toastify';
import Navbar from './components/common/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Error from './pages/Error';
import { Routes, Route, useNavigate } from "react-router-dom";
import Footer from "./components/common/Footer";
import ProductDetail from './pages/ProductDetails';
import { useEffect, useContext } from 'react';
import { AppContext } from './context/AppContext';
import { ApiCalling } from './services/Api';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ErrorWrong from './pages/ErrorWrong';
import Verification from './pages/Verification';
import axios from "axios";
import Cards from './pages/Cards';
import AddressPayment from "./pages/AddressPayment"
import ThankYou from "./pages/ThankYou"
import MyOrders from './components/user/MyOrders';
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import ForgotPassword from "./pages/ForgotPassword";



function UserDashboard() {

  const { setCategories, setTags, setIsLoggedIn } = useContext(AppContext);
  const navigate = useNavigate();

  async function defaultApiCalling() {

    // Default route
    await ApiCalling("GET", "extra/saveUserAgent");

    // for categories
    const res = await ApiCalling("GET", "category/getAllCategory");
    if (res?.success) {
      setCategories(res?.data);
    } else {
      toast.error(res?.data?.message);
      setCategories([]);
      navigate("/error/something-went-wrong");
    }

    // for tags
    const res1 = await ApiCalling("GET", "tag/getAllTags");
    if (res1?.success) {
      setTags(res1?.data);
    } else {
      toast.error(res1?.data?.message);
      setTags([]);
      navigate("/error/something-went-wrong")

    }


    // validate the user
    const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;
    const token = localStorage.getItem("EcommerceUser");

    if (token) {

      const { data } = await axios.get(BASE_URL + "auth/validate", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        }
      });

      setIsLoggedIn(data?.data);
    } else {
      navigate("/auth/login");
    }

  }

  useEffect(() => {
    defaultApiCalling();
  }, []);


  return (
    <div>
      <div className='w-full h-[100vh] bg-[black]/[0.02] scrollbar-hide overflow-auto'>
        <Navbar />
        <div className='min-h-[calc(100vh-80px)] py-5 w-full mt-16 xl:mt-24'>
          <Routes>
            <Route path='*' element={<Error />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/' exact element={<Home />} />
            <Route path='/About' element={<About />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/orders' element={<MyOrders />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/auth/login' element={<Login />} />
            <Route path='/wishlist' element={<Wishlist />} />
            <Route path='/auth/signup' element={<Signup />} />
            <Route path='/thank-you-page' element={<ThankYou />} />
            <Route path='/products/:query/:value' element={<Cards />} />
            <Route path='/change-password' element={<ChangePassword />} />
            <Route path='/user/address&payment' element={<AddressPayment />} />
            <Route path='/auth/forget-password' element={<ForgotPassword />} />
            <Route path='/error/something-went-wrong' element={<ErrorWrong />} />
            <Route path='/productDetail/productId/:id' element={<ProductDetail />} />
            <Route path='/auth/verify/:verificationId/:userId' element={<Verification />} />
          </Routes>
        </div>

        <Footer />

      </div>

    </div>

  )
}

export default UserDashboard;
