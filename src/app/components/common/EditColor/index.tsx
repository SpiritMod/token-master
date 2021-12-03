// core
import React, { useEffect, useState, useRef } from "react";
import { ChromePicker } from "react-color";

// styles
import classes from "./styles.module.scss";

// icons
import EyeDropper from "../../../assets/icons/eyedropper.svg";

// components
import Button from "../../ui/Button/Button";

// helpers
import {hexToRgba, rgbaToFigma} from "../../../_helpers/colors";

// hooks
import {useFigmaStyles} from "../../../store/figmaStyles/useFigmaStyles";

const inlineStyles = {
  container: {
    boxShadow: 'none',
    height: 'auto',
    width: '100%',
  },
};

const EditColor = () => {

  const { selectedColor, editedData } = useFigmaStyles();
  const inputColor = useRef(null);
  const [color, setColor] = useState({ rgb: {r: 0, g: 0, b: 0, a: 1} });

  useEffect(() => {
    if (!!selectedColor) {
      setColor(selectedColor);
    }
  }, [selectedColor]);


  const onChangeComplete = (color) => {
    setColor(color);
    // color = {
    //   hex: '#333',
    //   rgb: {
    //     r: 51,
    //     g: 51,
    //     b: 51,
    //     a: 1,
    //   },
    //   hsl: {
    //     h: 0,
    //     s: 0,
    //     l: .20,
    //     a: 1,
    //   },
    // }
  }

  const onChangeInputColor = (e) => {
    const newColor = { rgb: hexToRgba(e.target.value) };
    setColor(newColor);
    inputColor.current.blur();
    inputColor.current.value = "";
  }

  const handleUpdate = () => {
    const newColor = rgbaToFigma(color.rgb);

    parent.postMessage({ pluginMessage: { type: 'update_paint_styles', data: {
      color: newColor,
      styles: editedData,
    }}}, '*');
  };

  return (
    <>
      <div className={classes.picker}>
        <ChromePicker
          //@ts-ignore
          styles={ inlineStyles }
          color={color.rgb}
          onChangeComplete={onChangeComplete}
        />
      </div>
      <div className={classes.footer}>
        <div className={classes.pipette}>
          <input
            ref={inputColor}
            type="color"
            id="pipette"
            name="pipette"
            onChange={(e) => onChangeInputColor(e)}
          />
          <label htmlFor="pipette">
            <EyeDropper />
          </label>
        </div>
        <Button onClick={handleUpdate}>Update</Button>
      </div>
    </>
  )
};

export default EditColor;
