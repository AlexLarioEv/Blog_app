import React from 'react'
import { Alert } from 'antd'

interface IProps {
  errorText: string
}

const ErrorMessage: React.FC<IProps> = (props) => <Alert message="Error Text" description={props.errorText} type="error" closable />

export default ErrorMessage
