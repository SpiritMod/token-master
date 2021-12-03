import React, {useEffect, useRef, useState } from 'react';

//styles
import style from "./styles.module.scss";

// hooks
import {useOnClickOutside} from "../../../_hooks/useOnClickOutside";
import {useFigmaStyles} from "../../../store/figmaStyles/useFigmaStyles";
import {useUI} from "../../../store/ui/useUI";

//components
import Button from "../../ui/Button/Button";

//icons
import Down from "../../../assets/icons/down.svg";
import Check from "../../../assets/icons/check.svg";

//types
import {ITokensItem} from "../../../store/figmaStyles/types";


const CreateNewMode = () => {
  const ref = useRef();

  const { tokens, styles, themesList, setThemesList, setListToClientStorage } = useFigmaStyles();
  const { toggleModalCreateMode } = useUI();

  const [modeName, setModeName] = useState<string>('');
  const [modeBase, setModeBase] = useState<ITokensItem>(tokens[0]);
  const [modeError, setModeError] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!!tokens.length) {
      setModeBase(tokens[0]);
    }
  }, [tokens]);

  const handleChangeField = (e) => {
    const notValidName = styles.reduce((total: number, item) => {
      if (item.themeName === e.target.value) {
        total = total + 1
      }
      return total
    }, 0);

    if (!!notValidName || e.target.value.length === 0 ) {
      setModeError(true);
      setDisabledBtn(true);
    } else {
      setModeError(false);
      setDisabledBtn(false);
    }

    setModeName(e.target.value);
  }

  const handleCreateNewMode = (name, base) => {
    const notValidName = styles.reduce((total: number, item) => {
      if (item.themeName === name) {
        total = total + 1
      }
      return total
    }, 0);

    if (name.length === 0 || base.length === 0 || !!notValidName) {
      setModeError(true);
    } else {
      /* Clone theme styles logic */
      parent.postMessage({ pluginMessage: { type: 'create_new_mode', data: {
        data: base.data,
        oldName: base.themeName,
        name: name
      }}}, '*');

      setThemesList(
        [ ...themesList, { id: Date.now(), value: name}]
      );
      setListToClientStorage([ ...themesList, { id: Date.now(), value: name}]);

      // close modal
      toggleModalCreateMode();
    }
  };

  /* Dropdown */
  useOnClickOutside(ref, () => setIsOpen(false));


  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  }

  const handleSelectedMode = (value) => {
    setModeBase(value);
    setIsOpen(false)
  }
  /* END Dropdown */

  const filteredTokens = tokens.filter((item) => !!item.themeName.replace(/\s/g, ''));

  const list = filteredTokens.map((item:ITokensItem, index) => {
    return <div
      key={`${index}`}
      className={style.dropdown__list_item}
      onClick={() => handleSelectedMode(item)}
    >
      { modeBase.themeName === item.themeName && <Check />}
      <span>{item.themeName}</span>
    </div>
  });

  return (
    <div className={style.createMode}>
      <div className={style.header}>Select mode to create new mode</div>
      <div className={style.content}>
        <div className={style.field}>
          <input
            className={`${modeError && style.input_error}`}
            type="text"
            placeholder={'Example «Dark_form»'}
            value={modeName}
            readOnly={false}
            onChange={(e) => handleChangeField(e)}
          />

          <div className={style.dropdown}>
            <div className={style.dropdown__btn} onClick={() => toggleDropdown()}>
              <span>{`from ${modeBase.themeName}`}</span>
              <Down/>
            </div>
            <div className={`${style.dropdown__list} ${isOpen ? style.dropdown__list_open : ''}`} ref={ref}>
              {list}
            </div>
          </div>

        </div>
      </div>
      <div className={style.footer}>
        <Button disabled={disabledBtn} onClick={() => handleCreateNewMode(modeName, modeBase)}>Create</Button>
      </div>
    </div>
  );
}

export default CreateNewMode;
