const min = 0
const max = 20

const Input = ({value, func, label, type}) => {
    if (label === 'Level: ') {
      label = 'Level ' + value + ': '
    }
    if (type === 'area') {
      return (
        <div>
          <label htmlFor={label}>{label}
          <br></br>
          <textarea id={label} name={label} value={value} 
          onChange={({target}) => func(target.value)} type={type} />
          </label>
        </div>
      )
    } else if (type === 'file') {
      return (
        <label>
        {label}
        <input type='file' name='photo' value={value.file}  
               onChange={e => func(e.target.files[0])} 
                accept=".png, .jpg, .jpeg"/>
      </label>
      )  
    }
    return (
      <label>
        {label}
        <input value={value} min={min} max={max} 
               onChange={({target}) => func(target.value)} 
               type={type}/>
      </label>
    )
}

export default Input