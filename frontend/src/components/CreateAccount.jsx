import { TextField, Button } from "@mui/material"

const CreateAccount = (props) => {
    return (
        <div>
            <form onSubmit={props.onClick}>
                <div>
                    <TextField id="outlined-basic" label="username" value={props.username} 
                        onChange={({target}) => props.onChangeUser(target.value)}> </TextField>
                </div>
                <div>
                    <TextField id="outliend-basic" label="password" type="password"
                        value={props.password} 
                        onChange={({target}) => props.onChangePass(target.value)}>
                    </TextField>
                </div>
                <div>
                    <TextField id="outliend-basic" label="retype password" type="password" 
                        value={props.retype} onChange={({target}) => props.onChangeRetype(target.value)}>
                    </TextField>
                </div>
                <div>
                    <TextField id="outlined-basic" label="public name" value={props.publicName} 
                        onChange={({target}) => props.onChangePubName(target.value)}>
                    </TextField>
                </div>
                <Button variant="outlined">Create Your Account</Button>
            </form>
            <Button variant="outlined" onClick={props.onClickCancel}>cancel</Button>
        </div>
    )
}

export default CreateAccount