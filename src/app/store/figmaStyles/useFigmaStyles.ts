import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { figmaStylesActions } from "./actions";
import {IFigmaStyle, IFigmaStylesState, IPaintStyle} from "./types";

type storeState = {
  figmaStyles: IFigmaStylesState
}

export const useFigmaStyles = () => {
  const dispatch = useDispatch();

  const {
    styles,
    themesList,
    tokens,
    selectedColor,
    editedData,
  } = useSelector((state: storeState) => state.figmaStyles);

  const setData = (data) => dispatch(figmaStylesActions.setData(data));
  const setTokensData = (data) => dispatch(figmaStylesActions.setTokensData(data));
  const setThemesList = (data) => dispatch(figmaStylesActions.setThemesData(data));
  const setSelectedColor = (data) => dispatch(figmaStylesActions.setSelectedColor(data));
  const setEditedData = (data) => dispatch(figmaStylesActions.setEditedData(data));

  const setListToClientStorage = (data) => {
    parent.postMessage({ pluginMessage: { type: 'update_themes_list', data: data } }, '*');
  };

  // useEffect(() => {
  //   if (!themesList.length) {
  //     setTokensData([]);
  //   }
  // },[themesList]);

  useEffect(() => {
    if (!!styles) {

      const allStyles = styles.reduce((arr:IFigmaStyle[], item:IPaintStyle) => {
        // @ts-ignore
        arr.push(...item.data);
        return arr;
      }, []);

      if (themesList.length > 1 || (themesList.length === 1 && themesList[0].value.replace(/\s/g, '') !== '')) {

        const themesDataArrNew = themesList.reduce((arr, current) => {
          const stylesData = allStyles.reduce((theme:IFigmaStyle[], item:IFigmaStyle) => {
            if (item.name.includes(current.value)) {
              theme.push(item)
            }
            return theme;
          }, []);

          arr.push({
            themeName: current.value,
            data: stylesData
          })

          return arr
        }, []);

        const themeGroupedColors = themesDataArrNew.reduce((arr, current) => {

          const helper = {};
          const groupedColors = current.data.reduce((acc, item, index) => {

            const key = item.paints[0].color.r + '-' + item.paints[0].color.g + '-' + item.paints[0].color.b + '-' + item.paints[0].opacity;

            if (!helper[key]) {
              helper[key] = Object.assign({}, {
                group: `Group ${index}`,
                data: [item]
              });
              acc.push(helper[key]);
            } else {
              helper[key].data = [...helper[key].data, item];
            }

            return acc;
          }, []);

          arr.push({
            ...current,
            data: groupedColors
          });

          return arr

        }, []);

        setTokensData(themeGroupedColors);
      } else {
        const helper = {};
        const groupedColors = allStyles.reduce((acc, item, index) => {
          const key = item.paints[0].color.r + '-' + item.paints[0].color.g + '-' + item.paints[0].color.b + '-' + item.paints[0].opacity;

          if (!helper[key]) {
            helper[key] = Object.assign({}, {
              group: `Group ${index}`,
              data: [item]
            });
            acc.push(helper[key]);
          } else {
            helper[key].data = [...helper[key].data, item];
          }

          return acc;
        }, []);

        setTokensData([{
          themeName: "Color Styles",
          data: groupedColors
        }]);
      }
    }
  }, [styles, themesList]);



  return {
    styles,
    themesList,
    selectedColor,
    editedData,
    tokens,
    setData,
    setThemesList,
    setSelectedColor,
    setEditedData,
    setTokensData,
    setListToClientStorage
  }
}
