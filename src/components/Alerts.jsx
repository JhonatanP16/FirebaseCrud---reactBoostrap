import React from 'react'
import { Alert } from 'react-bootstrap'

const Alerts = ({children,messageVariant,setShow}) => {
  return (
    <Alert variant={messageVariant} onClose={() => setShow('')} dismissible>
      <Alert.Heading>{children}</Alert.Heading>
    </Alert>
  )
}

export default Alerts
