// actions types

export enum types {
  // Sync
  FIGMA_STYLES_SET_DATA = 'FIGMA_STYLES_SET_DATA',
  THEMES_LIST_SET_DATA = 'THEMES_LIST_SET_DATA',
  THEMES_LIST_START_FETCHING = 'THEMES_LIST_START_FETCHING',
  THEMES_LIST_STOP_FETCHING = 'THEMES_LIST_STOP_FETCHING',
  THEMES_LIST_FETCHING_ERROR = 'THEMES_LIST_FETCHING_ERROR',
  SET_TOKENS_DATA = 'SET_TOKENS_DATA',
  SET_PALETTE_DATA = 'SET_PALETTE_DATA',
  //SET_API_KEY = 'SET_API_KEY',

  SET_SELECTED_COLOR = 'SET_SELECTED_COLOR',
  SET_EDITED_DATA = 'SET_EDITED_DATA',

  // Async
  THEMES_LIST_FETCH = 'THEMES_LIST_FETCH',
  THEMES_LIST_POST_FETCH = 'THEMES_LIST_POST_FETCH',
}

// item
export interface IStyleDataItem {
  blendMode: string
  color: {
    r: number,
    g: number,
    b: number
  }
  opacity: number,
  type: string,
  visible: boolean
}

export interface IFigmaStyle {
  description: string,
  id: string,
  key: string,
  name: string
  paints: IStyleDataItem[],
  remote: boolean,
  type: string,
}


export interface IThemeItem {
  id: number,
  value: string,
}

export interface IPaintStyle {
  themeName: string,
  data: {
    description: string,
    id: string,
    key: string,
    name: string
    paints: IStyleDataItem[],
    remote: boolean,
    type: string,
  }
}



export interface IPaletteItem {
  group: string,
  data: IPaintStyle[]
}

export interface ITokenDataItem {
  description: string,
  id: string,
  key: string,
  name: string
  paints: IStyleDataItem[],
  remote: boolean,
  type: string,
}

export interface ITokensItem {
  themeName: string,
  data: ITokenDataItem[]
}

export interface ISelectedColor {
  rgb: {
    r: number,
    g: number,
    b: number,
    a: number
  }
}


// state
export interface IFigmaStylesState {
  readonly styles: IPaintStyle[] | null,
  readonly themesList: IThemeItem[] | null,
  readonly tokens: ITokensItem[] | null,
  readonly selectedColor: ISelectedColor | null,
  readonly editedData: IFigmaStyle[] | null,
  readonly error: any | null,
  //readonly apiKey: string,
}


