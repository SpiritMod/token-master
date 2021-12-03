// core
import React, {useEffect} from "react";

// hooks
import {useFigmaStyles} from "../../../store/figmaStyles/useFigmaStyles";

interface ComponentProps {
  children: JSX.Element | string;
}

const OnMessageWrapper = (props:ComponentProps) => {
  const { children } = props;

  const { setData, setThemesList } = useFigmaStyles();

  useEffect(() => {
    // This is how we read messages sent from the plugin controller
    window.onmessage = (event) => {
      const {type, message} = event.data.pluginMessage;

      if (type === 'styles') {
        setData(message);
      }

      if (type === 'themes_list') {
        setThemesList(JSON.parse(message));
      }
    };
  }, []);


  return (
    <>{children}</>
  );
};

export default OnMessageWrapper;
