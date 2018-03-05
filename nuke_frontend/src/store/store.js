import { createStore, applyMiddleware, combineReducers } from "redux"
import thunk from "redux-thunk"
import GridSquares from "../reducers/gridsquares"

const reducers = combineReducers({
  GridSquares
})

export default createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
)
