export const AddUser = (claim) =>{
    return{
        type: 'SET_USER',
        claim
    }
}
export const AddBooking = (claim) =>{
    return{
        type: 'ADD_BOOKING',
        claim
    }
}
export const Appoint = (claim) =>{
    return{
        type: 'ADD_APOINT',
        claim
    }
}