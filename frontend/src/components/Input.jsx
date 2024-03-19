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
          <textarea id={label} min={min} max={max} name={label} value={value} onChange={func} type={type} />
          </label>
        </div>
      )
    }
    return (
      <label>
        {label}
      <input value={value} min={min} max={max} onChange={func} type={type}/>
      </label>
    )
}

export default Input