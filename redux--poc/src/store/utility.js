export const updated=(oldState,updateState)=>{
    return {
        ...oldState,
        ...updateState
    }
}