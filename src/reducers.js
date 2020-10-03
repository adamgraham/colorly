import { combineReducers } from 'redux';
import { randomColorHex } from './utils/colors';

const defaultState = {
  baseColor: randomColorHex(),
  secondaryBaseColor: '#000000',
};

const color = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_BASE_COLOR':
      return { ...state, baseColor: action.color };
    case 'SET_SECONDARY_BASE_COLOR':
      return { ...state, secondaryBaseColor: action.color };
    default:
      return state;
  }
};

const reducers = combineReducers({
  color: color,
});

export default reducers;
