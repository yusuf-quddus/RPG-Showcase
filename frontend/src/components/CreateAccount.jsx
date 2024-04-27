import { TextField, Button } from "@mui/material"

const CreateAccount = (props) => {
    return (
        <div>
            <form onSubmit={props.onClick}>
                <div className="account_form">
                    <TextField variant="outlined" label="username" value={props.username} 
                        onChange={({target}) => props.onChangeUser(target.value)}> </TextField>
                </div>
                <div className="account_form">
                        <TextField variant="outlined" label="password" type="password"
                            value={props.password} 
                            onChange={({target}) => props.onChangePass(target.value)}>
                        </TextField>
                    <span className="account_inputs">
                        <TextField variant="outlined" label="retype password" type="password" 
                            value={props.retype} onChange={({target}) => props.onChangeRetype(target.value)}>
                        </TextField>
                    </span>
                </div>
                <div className="account_form">
                    <TextField variant="outlined" label="public name" value={props.publicName} 
                        onChange={({target}) => props.onChangePubName(target.value)}>
                    </TextField>
                </div>
                <div className="account_buttons form_button">
                    <Button variant="outlined" onClick={props.onClick}>Create Your Account</Button>
                    <span className="account_inputs">
                        <Button variant="outlined" onClick={props.onClickCancel}>cancel</Button>
                    </span>
                </div>
            </form>
        </div>
    )
}

export default CreateAccount