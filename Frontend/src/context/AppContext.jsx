import { createContext } from 'react';
import { useState } from 'react';


export const AppContext = createContext();

export default function AppContextProvider({ children }) {


    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);


    const value = {
        isLoggedIn,
        setIsLoggedIn,
        loading,
        tags,
        setTags,
        setLoading,
        setCategories,
        categories,
    }

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}