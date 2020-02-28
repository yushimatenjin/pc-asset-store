import * as React from "react";

type Props = {
  buttonText: string;
  onClick?: <T>(arg0: T) => any;
};

export default (props: Props) => {
  if (props.onClick) {
    return <button onClick={props.onClick}>{props.buttonText}</button>;
  } else {
    return <button>{props.buttonText}</button>;
  }
};
