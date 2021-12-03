//core
import React from "react";

// styles
import classes from "./styles.module.scss";

//icons
import EmptyIcon from "../../../assets/icons/empty.svg";


const Empty = (props) => {
  const { text } = props;

  return (
    <div className={classes.empty}>
      <div className={classes.icon}><EmptyIcon /></div>
      <div className={classes.text}>{text}</div>
    </div>
  );
};

export default Empty;
