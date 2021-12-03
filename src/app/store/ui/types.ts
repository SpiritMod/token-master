// actions types
export enum types {
  // Sync
  UI_TOGGLE_MODAL_CREATE_MODE = 'UI_TOGGLE_MODAL_CREATE_MODE',
  UI_TOGGLE_MODAL_EDIT_COLOR = 'UI_TOGGLE_MODAL_EDIT_COLOR',
  UI_TOGGLE_LOADER = 'UI_TOGGLE_LOADER',
}

// state
export interface IUI {
  readonly modalEditColor: boolean,
  readonly modalCreateMode: boolean,
  readonly loader: boolean,
}


