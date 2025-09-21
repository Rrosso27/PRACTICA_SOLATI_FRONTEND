import { API_CONFIG, AUTH_CONFIG } from "../config/api";
import axios from "axios";

export const makeRequest = async (endpoint, params = null, method, data = null) => {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS[endpoint]}${params ? `/${params}` : ""}`;
    const headers = {
        "Content-Type": "application/json",
        Authorization: `${AUTH_CONFIG.TOKEN_PREFIX} ${localStorage.getItem(AUTH_CONFIG.TOKEN_KEY) || ""
            }`,
    };
    const config = {
        method: method,
        url: url,
        headers: headers,
        data: data,
        timeout: API_CONFIG.TIMEOUT,
    };
    try {
        const response = await axios(config);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Error response:", error.response.data);
            return error.response.data;
        } else if (error.request) {
            console.error("Error request:", error.request);
            return error.request;
        } else {
            console.error("Error message:", error.message);
            return error.message;
        }
    }
};
