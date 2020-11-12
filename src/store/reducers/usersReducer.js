const initialState = {

}

const UsersReducer = (state=initialState, action)=>{
    switch (action.type) {       
        case 'SET_USER':
            return{
                ...state,
                userdata: action.claim
            }
        case 'ADD_BOOKING':
            return{
                ...state,
                booking: action.claim
            }
        case 'ADD_APOINT':
            return{
                ...state,
                appoint: action.claim
            }
        default:
            return state
    }
}

export default UsersReducer