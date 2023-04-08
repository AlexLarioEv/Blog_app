import React from 'react'
import { Alert } from 'antd'

interface IErrorMessageProps {
  errorText: string
}

const ErrorMessage: React.FC<IErrorMessageProps> = (props) => <Alert message="Error Text" description={props.errorText} type="error" closable />

export default ErrorMessage
