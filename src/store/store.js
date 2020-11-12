import {createStore, combineReducers} from 'redux'
import UsersReducer from './reducers/usersReducer'

const rootReducer = combineReducers({
  UsersReducer
})

const storeGiver = ()=>{
  return createStore(rootReducer)
}

export default storeGiver;
