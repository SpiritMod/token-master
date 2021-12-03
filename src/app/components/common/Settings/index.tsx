//core
import React, {useEffect, useState} from 'react';

//styles
import classes from "./styles.module.scss";

//icons
import Plus from "../../../assets/icons/plus.svg";
import Create from "../../../assets/icons/create.svg";

//hooks
import {useFigmaStyles} from "../../../store/figmaStyles/useFigmaStyles";
import {useUI} from "../../../store/ui/useUI";

//types
import {IThemeItem} from "../../../store/figmaStyles/types";

//components
import Button from "../../ui/Button/Button";
import Field from "./Field";
import Empty from "../../ui/Empty";


const Settings = () => {

  const { styles, themesList, setThemesList, setListToClientStorage } = useFigmaStyles();
  const { toggleModalCreateMode } = useUI();

  const [disableAddBtn, setDisableAddBtn] = useState(false);
  const [disableNewModeBtn, setDisableNewModeBtn] = useState(true);

  useEffect(() => {
    if (themesList.length === 0 || themesList[themesList.length-1].value !== '') {
      setDisableAddBtn(false);
    } else {
      setDisableAddBtn(true);
    }

    const notModeInStyles = styles.reduce((total: number, item) => {
      themesList.map((el) => {
        if (item.themeName === el.value) {
          total = total + 1
        }
      })

      return total
    }, 0);

    if (notModeInStyles > 0) {
      setDisableNewModeBtn(false)
    } else  {
      setDisableNewModeBtn(true)
    }

  }, [themesList]);

  const handlerAddField = (e) => {
    e.preventDefault();

    const list = [
      ...themesList,
      { id: Date.now(), value: ''}
    ];

    setThemesList(list);
    setListToClientStorage(list);
  };

  const handleRemoveField = (e, id) => {
    e.preventDefault();

    const newArr = themesList.reduce((arr, current) => {
      if (!(current.id === id)) {
        arr.push(current);
      }
      return arr;
    }, []);

    setThemesList(newArr);
    setListToClientStorage(newArr);
  };

  const handleChangeValue = (value: string, id: any) => {
    const updatedThemesList = themesList.reduce((arr:IThemeItem[], current:IThemeItem) => {
      if (id === current.id) {
        arr.push({
          ...current,
          value: value
        });
      } else {
        arr.push(current);
      }

      return arr
    }, []);

    setThemesList(updatedThemesList);
    setListToClientStorage(updatedThemesList);
  }

  const FieldList = !!themesList.length && themesList.map((item) => {
    return <Field
              key={`f-${item.id}`}
              value={item.value}
              id={item.id}
              handlerRemove={handleRemoveField}
              handleChangeValue={handleChangeValue}
           />
  });

  const empty = !themesList.length && <Empty text="Click on + to add mode" />

  return (
    <>
      <div className={classes.settings}>
        <div className={classes.settings__content}>
          <div className={classes.settings__modes}>
            <div className={classes.settings__header}>
              <h4>Mode</h4>
              <button disabled={disableAddBtn} onClick={handlerAddField} type={'button'}><Plus /></button>
            </div>
            <div className={classes.settings__list}>
              {FieldList}
              {empty}
            </div>
          </div>

        </div>
        <div className={classes.settings__footer}>
          <Button variant="text" disabled={disableNewModeBtn} secondary={true} onClick={() => toggleModalCreateMode()}>
            <><Create /> Create new mode</>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Settings;
