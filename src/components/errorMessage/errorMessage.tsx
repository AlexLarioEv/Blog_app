import React from "react";
import { Alert } from "antd";

interface props {
  errorText: string;
}

const onClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  console.log(e, "I was closed.");
};

const ErrorMessage: React.FC<props> = (props) => (
  <Alert
    message="Error Text"
    description={props.errorText}
    type="error"
    closable
    onClose={onClose}
  />
);

export default ErrorMessage;
