import { Button } from "@mui/material"

const Header = ({user, onClick}) => {

    const logout = () => (
        <div>
            Logged in as { user.name}
            <span className='account_inputs'>
                <Button variant="outlined" onClick={onClick}>Logout</Button>
            </span>
        </div>
    )

    return (
        <div>
            <h1><a href="/" className="color-primary" style={{ textDecoration: 'none' }}>RPG Showcase</a></h1>
            <span>{user === null ? null : logout()}</span>
        </div>
    )
}

export default Header