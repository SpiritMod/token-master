import React, {useEffect, useState} from 'react';

//styles
import styles from './styles.module.scss';

const InputField = (props) => {

  const { type, value, placeholder, callback, className } = props;

  const [fieldValue, setFieldValue] = useState(value);


  useEffect(() => {
    setFieldValue(value)
  }, [value]);


  const handleChangeValue = (e) => {
    setFieldValue(e.target.value);
    callback(e.target.value);
  }

  return (
    <div className={styles.field}>
      <input
        className={className}
        type={type}
        placeholder={placeholder}
        value={fieldValue}
        readOnly={false}
        onChange={(e) => handleChangeValue(e)}
      />
    </div>
  );
};

export default InputField;
