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

    async function wishlistHandler(data, isWishlist) {

        let url = "removeFromWishlist";

        if (isWishlist) {
            url = "removeFromWishlist"

        } else {
            url = "addToWishlist"
        }

        const res = await ApiCalling("PUT", `user/${url}/${isLoggedIn._id}/${data._id}`);

        if (res?.success) {
            setIsLoggedIn(res?.data);
            console.log(res?.data);
        } else {
            isLoggedIn(res?.data);
        }
    }

    const value = {
        isLoggedIn,
        setIsLoggedIn,
        loading,
        tags,
        wishlistHandler,
        setTags,
        setLoading,
        setCategories,
        categories,
    }

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}