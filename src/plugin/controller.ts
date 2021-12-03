// @ts-ignore
if(typeof String.prototype.replaceAll === "undefined") {String.prototype.replaceAll = function(match, replace) { return this.replace(new RegExp(match, 'g'), () => replace);}}

figma.showUI(__html__, {width: 342, height: 444});

const getFigmaLocalPaintStyles = () => {
  // @ts-ignore
  let styles = figma.getLocalPaintStyles();
  // @ts-ignore
  let paintsStyles = figma.getLocalPaintStyles().reduce((acc, current) => {
    acc.push({
      description: current.description,
      id: current.id,
      key: current.key,
      name: current.name,
      paints: current.paints,
      remote: current.remote,
      type: current.type,
    });

    return acc;
  }, []);

  return paintsStyles
}


const getAllStylesData = () => {
  const stylePaints = getFigmaLocalPaintStyles();

  /* array with all themes */
  const helperThemes = {};
  const themesKeysArr = stylePaints.reduce((arr, current) => {
    const key = current.name.replaceAll(' ', '/').split('/')[0];

    if (!helperThemes.hasOwnProperty(key)) {
      helperThemes[key] = Object.assign({}, {
        [key]: current.name.replaceAll(' ', '/').split('/')[0],
      });
      arr.push(current.name.replaceAll(' ', '/').split('/')[0]);
    }
    return arr;
  }, []);
  /* END array with all themes */

  const themesDataArr = themesKeysArr.reduce((arr:any[], current:string) => {
    const theme = stylePaints.reduce((theme, item) => {
      if (item.paints[0].type === "SOLID") {
        if (item.name.replaceAll(' ', '/').split('/')[0] === current) {
          theme.push(item)
        }
      }

      return theme
    }, []);

    if (theme.length > 0) {
      arr.push({
        themeName: theme[0].name.replaceAll(' ', '/').split('/')[0],
        data: theme
      });
    }

    return arr
  }, []);

  return themesDataArr;
}

let paintStylesData = getAllStylesData();

// send api key to plugin
figma.clientStorage.getAsync(`themesList_${figma.currentPage.id}`).then(
  data => {
    figma.ui.postMessage({
      type: 'themes_list',
      message: !!data ? data : "[]",
    });
  },
  () => {
    figma.ui.postMessage({
      type: 'themes_list',
      message: [],
    });
  }
);

figma.ui.postMessage({
  type: 'styles',
  message: [...paintStylesData],
});


figma.on("selectionchange", () => { console.log("selectionchange") })
figma.on("currentpagechange", () => { console.log("currentpagechange") })


figma.ui.onmessage = (msg) => {

  if (msg.type === 'update_themes_list') {
    figma.clientStorage.setAsync(`themesList_${figma.currentPage.id}`, JSON.stringify(msg.data)).then(
      () => {},
      error => { console.log('error: ', error) }
    )
  }

  if (msg.type === 'update_paint_styles') {
    const { color, styles } = msg.data;

    styles.map((item) => {
      // @ts-ignore
      figma.getStyleById(item.id).paints = [
        {
          ...item.paints[0],
          opacity: color.a,
          color: {
            r: color.r,
            g: color.g,
            b: color.b,
          }
        }
      ];
    });

    figma.ui.postMessage({
      type: 'styles',
      message: [...getAllStylesData()],
    });

    figma.notify(`Updated colors`);
  }

  if (msg.type === 'create_new_mode') {
    const { name, oldName, data } = msg.data;

    const baseColorsArr = data.reduce((arr, item) => {
      arr.push(...item.data)
      return arr
    }, []);

    baseColorsArr.map((item) => {
      const newName = item.name.replaceAll(oldName, name);
      const style = figma.createPaintStyle()
      style.name = newName;
      style.paints = item.paints;
    });

    figma.notify(`Created new mode "${name}"`);

    figma.ui.postMessage({
      type: 'styles',
      message: [...getAllStylesData()],
    });

  }

  //figma.closePlugin();
};
