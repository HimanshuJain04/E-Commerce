import { createContext } from 'react';
import { ApiCalling } from '../services/Api';
import { useState } from 'react';
import { toast } from "react-toastify";


export const AppContext = createContext();

export default function AppContextProvider({ children }) {


    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);

    async function addToCartHandler(id) {
        const res = await ApiCalling("POST", "user/addToCart", { productId: id, userId: isLoggedIn?._id })
        if (res?.success) {
            setIsLoggedIn(res?.data);
            console.log(res?.data);
            toast.success(res?.message);
        } else {
            console.log("res : ", res);
            toast.error(res?.message);
        }
    }

    async function addToWishlistHandler(id) {
        const res = await ApiCalling("POST", "user/addToWishlist", { productId: id, userId: isLoggedIn?._id })

        if (res?.success) {
            setIsLoggedIn(res?.data);
            console.log(res?.data);
            toast.success(res?.message);
        } else {
            console.log("res : ", res);
            toast.error(res?.message);
        }
    }

    async function removeFromWishlistHandler(id) {
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


    async function removeFromCartHandler(id) {
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


    const value = {
        tags,
        loading,
        setTags,
        isLoggedIn,
        categories,
        setLoading,
        setCategories,
        setIsLoggedIn,
        addToCartHandler,
        addToWishlistHandler,
        removeFromCartHandler,
        removeFromWishlistHandler,
    }

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}