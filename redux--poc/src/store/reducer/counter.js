import * as actionTypes from '../action/actionTypes';
import {updated} from '../utility'
const initialState = {
  counterR: 0
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INCREMENT:
      return updated(state,{counterR: state.counterR + 1});
    case actionTypes.DECREMENT:
      return updated(state, {  counterR: state.counterR > 0 ? state.counterR - 1 : 0,});
    case "ADD10":
      return updated(state, {counterR: state.counterR + action.value});
    case "SUB10":
      return updated(state, {counterR:state.counterR >= 10 ? state.counterR - action.value : state.counterR});
  }
  return state;

};
export default reducer;
