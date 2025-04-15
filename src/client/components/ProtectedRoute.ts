import React from "react";

const ProtectedRoute = ({children}) => {
    const token = localStorage.getItem('token');
    if (!token) {
        // Redirect to login page if token is not present
        window.location.href = '/login';
        return null; // Prevent rendering the children
    }
    return children; // Render the children if token is present


};
export default ProtectedRoute;

