import { TextField, Button } from "@mui/material"

const Login = ({loginHandler, username, password, onChangeUser, onChangePass, onClickCreateAccount}) => {
    return (
        <div>
            <form onSubmit={loginHandler}>
                <div>
                    <TextField id="outlined-basic" label="username" value={username} 
                        onChange={({target}) => onChangeUser(target.value)}> </TextField>
                </div>
                <div>
                    <TextField id="outliend-basic" label="password" type="password" 
                               value={password} onChange={({target}) => onChangePass(target.value)}>
                    </TextField>
                </div>
                <Button variant="outlined" type="submit">Login</Button>
            </form>
            <Button variant="outlined" onClick={() => onClickCreateAccount(true)}>Create Account</Button>
        </div>
    )
}

export default Login