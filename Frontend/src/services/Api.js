import axios from "axios";

// get base url from .env file
const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

export const ApiCalling = async (method, endUrl, data = "", config = { headers: { 'Content-Type': 'multipart/form-data' } }) => {

    const fullUrl = BASE_URL + endUrl;

    // let config = {
    //     headers: {
    //         'Content-Type': 'multipart/form-data',
    //     },
    // };


    try {

        let response;

        if (method === "GET") {
            response = await axios.get(fullUrl)
                .then((res) => {
                    return res?.data;
                })
                .catch((err) => {
                    return err?.response?.data;
                })
        }
        else if (method === "POST") {


            response = await axios.post(fullUrl, data, config)
                .then((res) => {
                    return res?.data;
                })
                .catch((err) => {
                    return err?.response?.data;
                })
        }
        else if (method === "PUT") {

            response = await axios.put(fullUrl, data)
                .then((res) => {
                    return res?.data;
                })
                .catch((err) => {
                    return err?.response?.data;
                })
        }
        else if (method === "DELETE") {

            response = await axios.delete(fullUrl)
                .then((res) => {
                    return res?.data;
                })
                .catch((err) => {
                    return err?.response?.data;
                });

        } else {
            response = "Wrong Method";
        }

        return response;

    } catch (err) {

        return err?.response?.data;

    }
}

