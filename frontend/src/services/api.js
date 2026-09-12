import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080"
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {

        if (error.response?.status === 401) {

            localStorage.removeItem("token");
            localStorage.removeItem("email");
            localStorage.removeItem("role");

            window.location.href = "/";
        }

        return Promise.reject(error);
    }
);

export default api;