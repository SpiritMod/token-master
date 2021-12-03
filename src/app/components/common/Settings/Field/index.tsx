//core
import React, {useState} from "react";

//styles
import styles from "./styles.module.scss";

//icons
import Minus from "../../../../assets/icons/minus.svg";

//interface
interface ComponentProps {
  id: number,
  value: string,
  key: any,
  handlerRemove: (e, id: number) => void,
  handleChangeValue: (value: string, id: any) => void
}

const Field: React.FC<ComponentProps> = (props) => {
  const { id, value, handlerRemove, handleChangeValue } = props;

  const [fieldValue, setFieldValue] = useState(value)

  const handleChange = (e, id) => {
    setFieldValue(e.target.value);
    handleChangeValue(e.target.value, id);
  }

  return (
    <div className={styles.field}>
      <input type="text" placeholder={'Enter Mode'} value={fieldValue} onChange={(e) => handleChange(e, id)}/>
      <button type={'button'} onClick={(e) => handlerRemove(e, id)}><Minus /></button>
    </div>
  );
};

export default Field;
