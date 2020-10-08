import { combineReducers } from 'redux';
import { randomColorHex } from './utils/colors';
import Color from 'color';

const defaultState = {
  baseColors: [randomColorHex()],
  baseColorIndex: 0,
  secondaryBaseColors: ['#000000'],
  secondaryBaseColorIndex: 0,
  selectedHarmony: null,
  selectedColorBlindness: null,
};

const setSelectedHarmony = (state, action) => {
  return { ...state, selectedHarmony: action.harmony };
};

const setSelectedColorBlindness = (state, action) => {
  return { ...state, selectedColorBlindness: action.colorBlindness };
};

const addBaseColor = (state, color) => {
  if (
    state.baseColors.length > 0 &&
    state.baseColors[state.baseColors.length - 1] === color
  ) {
    return state;
  }
  const baseColors = state.baseColors
    .slice(0, state.baseColorIndex + 1)
    .concat(color);
  return {
    ...state,
    baseColors,
    baseColorIndex: baseColors.length - 1,
  };
};

const addSecondaryBaseColor = (state, color) => {
  if (
    state.secondaryBaseColors.length > 0 &&
    state.secondaryBaseColors[state.secondaryBaseColors.length - 1] === color
  ) {
    return state;
  }
  const secondaryBaseColors = state.secondaryBaseColors
    .slice(0, state.secondaryBaseColorIndex + 1)
    .concat(color);
  return {
    ...state,
    secondaryBaseColors: secondaryBaseColors,
    secondaryBaseColorIndex: secondaryBaseColors.length - 1,
  };
};

const setBaseColor = (state, action) => {
  try {
    new Color(action.color);
    return addBaseColor(state, action.color.toLowerCase());
  } catch {
    return state;
  }
};

const setSecondaryBaseColor = (state, action) => {
  try {
    new Color(action.color);
    return addSecondaryBaseColor(state, action.color.toLowerCase());
  } catch {
    return state;
  }
};

const shuffleBaseColor = (state, action) =>
  addBaseColor(state, randomColorHex());

const shuffleSecondaryBaseColor = (state, action) =>
  addSecondaryBaseColor(state, randomColorHex());

const redoBaseColor = (state, action) => {
  return {
    ...state,
    baseColorIndex: Math.min(
      state.baseColorIndex + 1,
      state.baseColors.length - 1
    ),
  };
};

const redoSecondaryBaseColor = (state, action) => {
  return {
    ...state,
    secondaryBaseColorIndex: Math.min(
      state.secondaryBaseColorIndex + 1,
      state.secondaryBaseColors.length - 1
    ),
  };
};

const undoBaseColor = (state, action) => {
  return {
    ...state,
    baseColorIndex: Math.max(state.baseColorIndex - 1, 0),
  };
};

const undoSecondaryBaseColor = (state, action) => {
  return {
    ...state,
    secondaryBaseColorIndex: Math.max(state.secondaryBaseColorIndex - 1, 0),
  };
};

const bindings = {
  SET_SELECTED_HARMONY: setSelectedHarmony,
  SET_SELECTED_COLOR_BLINDNESS: setSelectedColorBlindness,
  SET_BASE_COLOR: setBaseColor,
  SET_SECONDARY_BASE_COLOR: setSecondaryBaseColor,
  SHUFFLE_BASE_COLOR: shuffleBaseColor,
  SHUFFLE_SECONDARY_BASE_COLOR: shuffleSecondaryBaseColor,
  REDO_BASE_COLOR: redoBaseColor,
  REDO_SECONDARY_BASE_COLOR: redoSecondaryBaseColor,
  UNDO_BASE_COLOR: undoBaseColor,
  UNDO_SECONDARY_BASE_COLOR: undoSecondaryBaseColor,
};

const color = (state = defaultState, action) => {
  return bindings[action.type] ? bindings[action.type](state, action) : state;
};

const reducers = combineReducers({
  color: color,
});

export default reducers;
