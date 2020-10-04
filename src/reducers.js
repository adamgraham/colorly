import { combineReducers } from 'redux';
import { randomColorHex } from './utils/colors';

const defaultState = {
  baseColor: randomColorHex(),
  secondaryBaseColor: '#000000',
  selectedHarmony: null,
};

const color = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_BASE_COLOR':
      return { ...state, baseColor: action.color };
    case 'SET_SECONDARY_BASE_COLOR':
      return { ...state, secondaryBaseColor: action.color };
    case 'SET_SELECTED_HARMONY':
      return { ...state, selectedHarmony: action.harmony };
    default:
      return state;
  }
};

const reducers = combineReducers({
  color: color,
});

export default reducers;
