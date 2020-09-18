import * as actionTypes from './actionTypes'
export const saveResult=(value)=>{
    return{
        type:actionTypes.STORERESULT,
        result:value
    };

}
export const storeRes = (value)=>{
    return dispatch=>{
        setTimeout(()=>{
            dispatch(saveResult(value))
        },2000)
    }
   
};
export const delRes = (value)=>{
    return{
        type:actionTypes.DELETERESULT,
        resultEid:value
    };
};