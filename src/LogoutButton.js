import React from "react";
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {
    const { logoutWithRedirect, isAuthenticated } = useAuth0();

    return (
        !isAuthenticated && (
            <button onClick={() => logoutWithRedirect()}>
                Sign out
            </button>
        )
    );
};

export default LogoutButton;