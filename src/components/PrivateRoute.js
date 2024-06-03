import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoute = ({ element }) => {
    const accessToken = Cookies.get('access_token');
    return accessToken ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
