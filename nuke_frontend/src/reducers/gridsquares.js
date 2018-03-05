const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_GRIDSQUARES":
      return action.gridsquares
    default:
      return state
  }
}
