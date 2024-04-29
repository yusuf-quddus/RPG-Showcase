import Input from "./Input"
import { Button } from "@mui/material"

const listSubclasses = (subclasses) => (
    <div className="account_form">
        subclasses: {subclasses.map(s => s + ' ')}
    </div>
)
    
const Form = (props) => {
    return (
        <div>
            <fieldset>
                <legend className="color-primary"><h3>Input Character Information</h3></legend>
                <form onSubmit={props.addCharacter} encType="multipart/form-data">
                    <Input value={props.name} func={props.setName} label="Name"/>
                    <Input value={props.level} func={props.setLevel} label="Level" type="range"/>
                    <Input value={props.race} func={props.setRace} label="Race"/>
                    <Input value={props.newClass} func={props.setSubclass} label="Class" 
                        onClick={() => props.handleAddSubclass(props.newClass)}/>
                    {props.subclasses.length === 0 ? null : listSubclasses(props.subclasses)}
                    <Input value={props.campaign} func={props.setCampaign} label="Campaign"/>
                    <Input value={props.dead} func={props.establishLife} label="Deceased?" type="checkbox"/>
                    <Input value={props.story} func={props.setStory} label="Backstory" type="area"/>
                    <Input value={props.status} func={props.setStatus} label="Current Status" type="area"/>
                    <Input value={props.image} func = {props.setImage} label="Image: " type = "file" />
                    <div className="account_buttons form_button">
                        <Button variant="outlined" type="button" onClick={props.clearForm}>clear</Button>
                        <Button variant="outlined" type="button" onClick={() => props.setCharFormVisible(false)}>close</Button>
                        <Button color="success" variant="outlined" type="submit">submit</Button>
                    </div>
                </form>
            </fieldset>
        </div>
    )
}

export default Form