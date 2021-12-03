import {useDispatch, useSelector} from "react-redux";
import {IUI} from "./types";
import {uiActions} from "./actions";


type storeState = {
  ui: IUI
}

export const useUI = () => {
  const dispatch = useDispatch();

  const { modalEditColor, modalCreateMode, loader } = useSelector((state: storeState) => state.ui);

  const toggleModalEditColor = () => dispatch(uiActions.toggleModalEditColor());
  const toggleModalCreateMode = () => dispatch(uiActions.toggleModalCreateMode());
  const toggleLoader = () => dispatch(uiActions.toggleLoader());

  return {
    modalEditColor,
    modalCreateMode,
    loader,
    toggleModalEditColor,
    toggleModalCreateMode,
    toggleLoader,
  }
}
