const CreateAccount = (props) => {
    return (
        <div>
            <form onSubmit={props.onClick}>
                <div>
                    username <input value={props.username} 
                                    onChange={({target}) => props.onChangeUser(target.value)}> 
                            </input>
                </div>
                <div>
                    password <input type="password" 
                                    value={props.password} 
                                    onChange={({target}) => props.onChangePass(target.value)}>
                            </input>
                </div>
                <div>
                    retype password <input type="password" 
                                    value={props.retype} 
                                    onChange={({target}) => props.onChangeRetype(target.value)}>
                            </input>
                </div>
                <div>
                    public name <input
                                    value={props.publicName} 
                                    onChange={({target}) => props.onChangePubName(target.value)}>
                            </input>
                </div>
                <button type="submit">Create Your Account</button>
            </form>
            <button onClick={props.onClickCancel}>cancel</button>
        </div>
    )
}

export default CreateAccount