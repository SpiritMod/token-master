//core
import React, {useState} from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

//styles
import classes from "./styles/styles.module.scss";
import tabs from "./styles/tabs.module.scss";

//hooks
import {useUI} from "../store/ui/useUI";

// components
import DesignTokens from "../components/common/DesignTokens";
import Settings from "../components/common/Settings";
import ModalDialog from "../components/ui/ModalDialog";
import CreateNewMode from "../components/common/CreateNewMode";
import EditColor from "../components/common/EditColor";

//icons
import Notice from "../assets/icons/notice.svg"

const Layout = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);

  const { modalCreateMode, modalEditColor, toggleModalCreateMode, toggleModalEditColor } = useUI();

  return (
    <>
      <div className={classes.layout}>

        <Tabs className={tabs.react_tabs} selectedIndex={tabIndex} onSelect={index => setTabIndex(index)} >
          <div className={classes.header}>
            <TabList className={tabs.react_tabs__tab_list}>
              <Tab className={tabs.react_tabs__tab} selectedClassName={tabs.react_tabs__tab__selected}>Design tokens</Tab>
              <Tab className={tabs.react_tabs__tab} selectedClassName={tabs.react_tabs__tab__selected}>Settings</Tab>
            </TabList>
            <a className={classes.link} href="https://danielamuntyan.notion.site/Token-Master-Figma-plugin-91721f954aef470f89e3f648539515f4" target="_blank">
              <Notice />
            </a>
          </div>

          <div className={classes.main}>
            <TabPanel className={tabs.react_tabs__tab_panel} selectedClassName={tabs.react_tabs__tab_panel__selected}>
              <DesignTokens />
            </TabPanel>
            <TabPanel className={tabs.react_tabs__tab_panel} selectedClassName={tabs.react_tabs__tab_panel__selected}>
              <Settings />
            </TabPanel>
          </div>

        </Tabs>

      </div>

      <ModalDialog
        className="modal"
        closeCls="close"
        isOpen={modalCreateMode}
        toggle={toggleModalCreateMode}
        title="Create new mode"
      >
        <div>
          <CreateNewMode />
        </div>
      </ModalDialog>

      <ModalDialog
        className="modal"
        closeCls="close"
        isOpen={modalEditColor}
        toggle={toggleModalEditColor}
        title="Edit token"
      >
        <div>
          <EditColor />
        </div>
      </ModalDialog>
    </>
  );
};

export default Layout;
