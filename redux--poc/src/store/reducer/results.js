const initialState = {
  results: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "STORERESULT":
      return {
        ...state,
        results: state.results.concat({ id: new Date(), val: action.result }),
      };
    case "DELETERESULT":
      // const id=2;
      // const newArray= [...state.results];
      // newArray.splice(id,1);
      const newArray = state.results.filter(
        (res) => res.id !== action.resultEid
      );
      return {
        ...state,
        results: newArray,
      };
    default:
      return state;
  }
};
export default reducer;
