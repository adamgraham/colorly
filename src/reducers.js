import { combineReducers } from 'redux';
import { randomColorHex } from './utils/colors';
import Color from 'color';

const defaultState = {
  baseColor: randomColorHex(),
  secondaryBaseColor: '#000000',
  selectedHarmony: null,
  selectedColorBlindness: null,
};

const color = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_BASE_COLOR':
      try {
        new Color(action.color);
        return { ...state, baseColor: action.color };
      } catch {
        return state;
      }
    case 'SET_SECONDARY_BASE_COLOR':
      try {
        new Color(action.color);
        return { ...state, secondaryBaseColor: action.color };
      } catch {
        return state;
      }
    case 'SET_SELECTED_HARMONY':
      return { ...state, selectedHarmony: action.harmony };
    case 'SET_SELECTED_COLOR_BLINDNESS':
      return { ...state, selectedColorBlindness: action.colorBlindness };
    default:
      return state;
  }
};

const reducers = combineReducers({
  color: color,
});

export default reducers;
