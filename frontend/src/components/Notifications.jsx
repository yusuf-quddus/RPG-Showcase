import { Alert } from "@mui/material"

const Notification = ({ message, error}) => {
  if (message === null) {
    return null
  }

  if (error) {
    return (
      <div>
        <Alert severity="error">
          {message}
        </Alert>
      </div>
    )
  } else {
    return (
      <div>
        <Alert severity="success">
        {message}
      </Alert>
      </div>
    )
  }
}

export default Notification