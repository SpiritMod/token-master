//core
import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

// types
import {ITokensItem} from "../../../store/figmaStyles/types";

// styles
import classes from "./styles.module.scss";

//icons
import Right from "../../../assets/icons/right.svg";

//hooks
import {useFigmaStyles} from "../../../store/figmaStyles/useFigmaStyles";

//components
import PaletteItem from "../PaletteItem";
import Empty from "../../ui/Empty";

const DesignTokens = () => {

  const { tokens } = useFigmaStyles();

  const emptyData = tokens.reduce( (total:number, item:ITokensItem) => {
    !!item.data.length && total++;
    return total
  }, 0);

  const filteredTokens = tokens.filter((item) => !!item.data.length && !!item.themeName.replace(/\s/g, ''));

  const renderColorsList = (arr) => {
    return !!arr.length ? arr.map((item:ITokensItem, index: number) => {
      return (
        <Accordion
          defaultExpanded={true}
          TransitionProps={{
            timeout: 100
          }}
          classes={{
            expanded: classes.accordion__expanded_root,
          }}
          className={classes.accordion}
          key={`acc-${index}`}>
          <AccordionSummary
            classes={{
              root: classes.accordion__root,
              content: classes.accordion__summary,
              expanded: classes.accordion__expanded,
              expandIconWrapper: classes.accordion__iconWrapper,
            }}
            expandIcon={<Right className={classes.accordion__icon} />}
            aria-controls={`panel${index}a-content`}
            id={`panel${index}a-header`}
          >
            <span className={classes.accordion__title}>
              { !!item.themeName.replace(/\s/g, '') ? item.themeName : 'Empty mode name' }
            </span>
          </AccordionSummary>
          <AccordionDetails className={classes.accordion__details}>
            {
              item.data.map((current, i) => {
                return <PaletteItem key={`i-${index}-${i}`} {...current} />
              })
            }
          </AccordionDetails>
        </Accordion>
      )
    }) : ''
  };

  console.log()

  const list = !!emptyData && renderColorsList(filteredTokens);

  const empty = !emptyData && <Empty text="Add color style to your figma file" />

  return (
    <div className={`${classes.wrapper} ${!emptyData ? classes.empty : ''}`}>
      {list}
      {empty}
    </div>
  );
};

export default DesignTokens;
