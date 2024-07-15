import React from "react";
import { Navigate} from "react-router-dom";
import auth from "../services/authService";

const ProtectedRoute = ({ element: Component, ...rest }) => {
    const user = auth.getCurrentUser();

    return user ? (
        <Component {...rest} />
    ) : (
        <Navigate to="/login"/>
    );
};

export default ProtectedRoute;
