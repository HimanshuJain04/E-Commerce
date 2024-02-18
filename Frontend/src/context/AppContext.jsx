import { createContext } from 'react';
import { ApiCalling } from "../services/api.js;
import { useState } from 'react';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';


export const AppContext = createContext();

export default function AppContextProvider({ children }) {

    const navigate = useNavigate();


    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    async function addToCartHandler(id) {

        if (!isLoggedIn) {
            navigate("/auth/login");
        } else {

            const res = await ApiCalling("POST", "user/addToCart", { productId: id, userId: isLoggedIn?._id })
            if (res?.success) {
                setIsLoggedIn(res?.data);
                toast.success(res?.message);
            } else {
                console.log("res : ", res);
                toast.error(res?.message);
            }
        }

    }

    async function addToWishlistHandler(id) {
        if (!isLoggedIn) {
            navigate("/auth/login");
        } else {
            const res = await ApiCalling("POST", "user/addToWishlist", { productId: id, userId: isLoggedIn?._id })

            if (res?.success) {
                setIsLoggedIn(res?.data);
                toast.success(res?.message);
            } else {
                console.log("res : ", res);
                toast.error(res?.message);
            }
        }
    }

    async function removeFromWishlistHandler(id) {
        if (!isLoggedIn) {
            navigate("/auth/login");
        } else {
            const res = await ApiCalling("POST", "user/removeFromWishlist", { productId: id, userId: isLoggedIn?._id })

            if (res?.success) {
                setIsLoggedIn(res?.data);
                console.log(res?.data);
                toast.success(res?.message);
            } else {
                console.log("res : ", res);
                toast.error(res?.message);
            }
        }
    }


    async function removeFromCartHandler(id) {

        if (!isLoggedIn) {
            navigate("/auth/login");
        } else {
            const res = await ApiCalling("POST", "user/removeFromCart", { productId: id, userId: isLoggedIn?._id })
            if (res?.success) {
                setIsLoggedIn(res?.data);
                console.log(res?.data);
                toast.success(res?.message);
            } else {
                console.log("res : ", res);
                toast.error(res?.message);
            }
        }
    }

    async function descreaseFromCartHandler(id) {
        if (!isLoggedIn) {
            navigate("/auth/login");
        } else {
            const res = await ApiCalling("POST", "user/descreaseFromCart", { cartItemId: id, userId: isLoggedIn?._id })
            if (res?.success) {
                setIsLoggedIn(res?.data);
                toast.success(res?.message);
            } else {
                console.log("res : ", res);
                toast.error(res?.message);
            }
        }
    }






    const value = {
        tags,
        loading,
        setTags,
        isLoggedIn,
        categories,
        setCurrentPage,
        currentPage,
        setLoading,
        setCategories,
        setIsLoggedIn,
        addToCartHandler,
        addToWishlistHandler,
        removeFromCartHandler,
        descreaseFromCartHandler,
        removeFromWishlistHandler,
    }

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
