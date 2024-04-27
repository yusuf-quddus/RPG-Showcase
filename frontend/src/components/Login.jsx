import { TextField, Button } from "@mui/material"

const Login = ({loginHandler, username, password, onChangeUser, onChangePass, onClickCreateAccount}) => {
    return (
        <div>
            <form onSubmit={loginHandler}>
                <div className="account_form">
                    <span>
                        <TextField variant="outlined" label="username" value={username} 
                            onChange={({target}) => onChangeUser(target.value)}> </TextField>
                    </span>
                    <span className="account_inputs">
                        <TextField variant="outlined" label="password" type="password" 
                                value={password} onChange={({target}) => onChangePass(target.value)}>
                        </TextField>
                    </span>
                </div>
                <div className="account_form">
                    <Button variant="outlined" type="submit">Login</Button>
                    <span className="account_inputs">
                        <Button variant="outlined" 
                            onClick={() => onClickCreateAccount(true)}>Create Account</Button>
                    </span>
                </div>
            </form>
        </div>
    )
}

export default Login