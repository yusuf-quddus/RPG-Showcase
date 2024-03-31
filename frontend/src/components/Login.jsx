const Login = ({loginHandler, username, password, onChangeUser, onChangePass}) => {
    return (
        <form onSubmit={loginHandler}>
            <div>
                username <input value={username} 
                                onChange={({target}) => onChangeUser(target.value)}> 
                         </input>
            </div>
            <div>
                password <input type="password" 
                                value={password} 
                                onChange={({target}) => onChangePass(target.value)}>
                         </input>
            </div>
            <button type="submit">Login</button>
        </form>
    )
}

export default Login