import { TextField, Slider, FormControlLabel, Checkbox, Button, styled } from "@mui/material"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const Input = ({value, func, label, type, onClick}) => {
    const min = 1
    const max = 20
    if (label === 'Level') {
      label = 'Level ' + value + ': '
    }
    if (type === 'area') {
      return (
        <div className="account_form">
          <TextField multiline label={label} rows={2} value={value} onChange={({target}) => func(target.value)} />
        </div>
      )
    } else if (type === 'file') {
      return (
        <div className="account_form">
          <Button component="label" role={undefined} variant="contained" tabIndex={-1}
            accept=".png, .jpg, .jpeg" onChange={e => func(e.target.files[0])} 
            startIcon={<CloudUploadIcon />}>
              Upload Image
              <VisuallyHiddenInput type="file" />
          </Button>
          {value.name == null ? (" .png .jpg .jpeg") : (' ' + value.name)}
        </div>
      )  
    } else if (type === 'range') {
      return (
        <div style={{width: 300}} className="range-center">
          {label} <Slider size="small" defaultValue={1} aria-label="Small" 
                  valueLabelDisplay="auto" shiftStep={1} step={1}
                  marks min={min} max={max} onChange={e => func(e.target.value)}/>
        </div>
      )
    } else if (type === 'checkbox') {
      return (
        <div className="account_form">
          <FormControlLabel control={<Checkbox onChange={({target}) => 
              {func(target.checked)}} />} label={label} />
        </div>
      )
    }
    if (label === 'Class') {
      return (
        <div className="account_form">
          <span>
            <TextField value={value} label={label} variant="outlined" onChange={({target}) => func(target.value)} />
          </span>
          <span className="account_inputs"> <Button variant="outlined" onClick={onClick}> add subclass</Button> </span>
        </div>
      )
    }
    return (
      <div className="account_form">
        <TextField value={value} label={label} variant="outlined" onChange={({target}) => func(target.value)} />
      </div>
    )
}

export default Input