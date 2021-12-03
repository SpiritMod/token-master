//core
import React from 'react';

//components
import ColorItem from "../../ui/ColorItem";

//styles
import classes from "./styles.module.scss";

// helpers
import {rgbToHex, rgbToRgba} from "../../../_helpers/colors";

//hooks
import {useUI} from "../../../store/ui/useUI";
import {useFigmaStyles} from "../../../store/figmaStyles/useFigmaStyles";

const PaletteItem = (props) => {

  const { data } = props;

  const { toggleModalEditColor } = useUI();
  const { setSelectedColor, setEditedData } = useFigmaStyles();

  const colors = data.map((item, i) => {
    return <ColorItem
      key={`c-${i}`}
      color={`${rgbToHex(item.paints[0].color)}`}
      rgba={{
        ...item.paints[0].color,
        a: item.paints[0].opacity,
      }}
      opacity={item.paints[0].opacity}
      label={item.name}
    />
  });

  const handleClick = (color) => {
    const { r,g,b,a } = color;
    const rgba = rgbToRgba({r,g,b}, a);

    setSelectedColor({rgb: rgba});
    setEditedData(data);

    toggleModalEditColor();
  };

  return (
    <div className={classes.item}>
      <div className={classes.content}>
        <div className={classes.col_left}>
          <ColorItem
            className={classes.pointer}
            color={`${rgbToHex(data[0].paints[0].color)}`}
            rgba={{
              ...data[0].paints[0].color,
              a: data[0].paints[0].opacity,
            }}
            opacity={data[0].paints[0].opacity}
            label={`${rgbToHex(data[0].paints[0].color)}`}
            onClick={handleClick}
          />
        </div>
        <div className={classes.col_right}>
          {colors}
        </div>
      </div>
    </div>
  );
};

export default PaletteItem;
