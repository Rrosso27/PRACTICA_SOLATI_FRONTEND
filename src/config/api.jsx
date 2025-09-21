export const API_CONFIG = {
    BASE_URL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
    ENDPOINTS: {
        TASKS: "/tasks"
    },
    TIMEOUT: 10000,
};

export const AUTH_CONFIG = {
    TOKEN_KEY: "access_token",
    USER_KEY: "user-data",
    TOKEN_PREFIX: "Bearer",
};
