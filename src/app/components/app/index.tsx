import React from "react";
import { Provider } from "react-redux";

import Layout from "../../layout";

// Instruments
import { store } from "../../store/store";

//
import OnMessageWrapper from "../common/OnMessageWrapper";


const App = () => {
  return (
    <>
      <Provider store={store}>
        <OnMessageWrapper>
          <Layout/>
        </OnMessageWrapper>
      </Provider>
    </>
  );
};

export default App;
