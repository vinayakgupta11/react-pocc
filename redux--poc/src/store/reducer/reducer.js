import * as actionTypes from '../action/action';
const initialState = {
  counterR: 0,
  results:[]
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INCREMENT:
      return {
          ...state,
        counterR: state.counterR + 1,
      };

    case actionTypes.DECREMENT:
      return {
        ...state,
        counterR: state.counterR > 0 ? state.counterR - 1 : 0,
      };

    case "ADD10":
      return {
        ...state,
        counterR: state.counterR + action.value,
      };

    case "SUB10":
      return {
        ...state,
        counterR:
          state.counterR >= 10 ? state.counterR - action.value : state.counterR,
      };
      case "STORERESULT":
        return {
          ...state,
          results:state.results.concat({id: new Date(), val:state.counterR})

          
        };
        case "DELETERESULT":
            // const id=2;
            // const newArray= [...state.results];
            // newArray.splice(id,1);
            const newArray= state.results.filter(res=> res.id!==action.resultEid)
            return {
              ...state,
              results:newArray
              
            };
            default:
              return state;
  }


};
export default reducer;
