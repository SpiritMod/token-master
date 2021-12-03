import React from 'react';

import styles from './Button.module.scss';

interface ComponentProps {
  disabled?: boolean,
  onClick: React.MouseEventHandler<HTMLButtonElement>,
  children: JSX.Element | string,
  secondary?: boolean,
  variant?: string,
}

const Button = ({ onClick, children, secondary = false, disabled, variant }: ComponentProps) => {
  const buttonType = secondary ? styles?.secondary : styles?.primary;

  const cls = [buttonType];

  if (variant === "text") {
    cls.push(styles.text);
  }

  return (
    <button onClick={onClick} className={`${styles?.base} ${cls.join(' ')} ${disabled ? styles?.disabled : ''}`}>
      {children}
    </button>
  );
};

export default Button;
