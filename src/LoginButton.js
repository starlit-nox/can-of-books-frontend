import { useAuth0 } from '@auth0/auth0-react'
import { Button } from 'react-bootstrap';

const LoginButton = () => {
    const { loginWithRedirect, isAuthenicated} = useAuth0();

    return (
        !isAuthenicated && (
            <Button onClick={() => loginWithRedirect}>
    Sign In
            </Button>
        )
    )
}

export default LoginButton