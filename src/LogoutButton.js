import { useAuth0 } from '@auth0/auth0-react'
import { Button } from 'react-bootstrap';

const LoginoutButton = () => {
    const { logout, isAuthenicated} = useAuth0();

    return (
        isAuthenicated && (
            <Button onClick={() => logout}>
    Sign Out
            </Button>
        )
    )
}

export default LoginoutButton