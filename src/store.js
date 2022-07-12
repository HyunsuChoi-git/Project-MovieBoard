//액션
export const increase = () =>({type:"INCREMENT"});
export const decrease = () => ({type:"DECREMENT"});


//상태
const initstate = {
    number: 1,
}

//액션의 결과를 리턴
// 리턴되면 상대방이 값을 받는게 아니라, 리턴되는 순간 상태UI자체가 바뀌는 것!
const reducer = (state = initstate, action) => {
    switch(action.type) {
        case "INCREMENT":
            return {number : state.number +1};
        case "DECREMENT":
            return {number: state.number-1};
        default:
            return state;
    }

}

export default reducer;