import Input from "./Input"

const Form = (props) => {
    return (
        <div>
            <fieldset>
                <legend>Input Character Information</legend>
                <form onSubmit={props.addCharacter} encType="multipart/form-data">
                <Input value={props.name} func={props.setName} label="Name: "/>
                <Input value={props.level} func={props.setLevel} label="Level: " type="range"/>
                <Input value={props.race} func={props.setRace} label="Race: "/>
                <Input value={props.newClass} func={props.setSubclass} label="Class: "/>
                <button type="button" 
                        onClick={() => props.handleAddSubclass(newClass)}>
                        add subclass</button>
                <Input value={props.campaign} func={props.setCampaign} label="Campaign: "/>
                <Input value={props.dead} func={props.establishLife} label="Is dead?: " type="checkbox"/>
                <Input value={props.story} func={props.setStory} label="Story: " type="area"/>
                <Input value={props.status} func={props.setStatus} label="Status: " type="area"/>
                <Input value={props.image} func = {props.setImage} label="Image: " type = "file" />
                <br></br>
                <button type="submit">submit</button>
                <button type="button" onClick={props.clearForm}>clear</button>
                <button type="button" onClick={() => props.setCharFormVisible(false)}>close</button>
                </form>
            </fieldset>
        </div>
    )
}

export default Form