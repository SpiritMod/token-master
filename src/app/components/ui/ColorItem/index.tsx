//core
import React from "react";

//styles
import classes from "./styles.module.scss";

interface ComponentProps {
  color: any,
  rgba: any,
  opacity: number,
  label: string,
  onClick?: any,
  children?: JSX.Element | string,
  className?: string
}

const ColorItem = ({ color, rgba, opacity, label, onClick, className }: ComponentProps) => {
  const opacityCls = [classes.opacity];
  const boxCls = [classes.box];
  const colorItem = [classes.item];

  if (className) {
    colorItem.push(className);
  }

  if (opacity === 1) {
    opacityCls.push(classes.opacity__fill)
  }

  if (color === '#ffffff') {
    boxCls.push(classes.border)
  }

  const handlerClick = (e) => {
    e.preventDefault()
    if ( typeof onClick === 'function' ) {
      if (rgba) {
        onClick(rgba)
      }
    }
  };

  return (
    <div
      className={colorItem.join(' ')}
      onClick={handlerClick}
    >
      <div className={boxCls.join(' ')}>
        <span className={classes.color} style={{background: `${color}`}} />
        <span className={opacityCls.join(' ')} style={{background: `${color}`}} />
      </div>
      <div className={classes.title}>{label}</div>
    </div>
  );

};

export default ColorItem;
