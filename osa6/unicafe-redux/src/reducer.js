const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  let changedState
  switch (action.type) {
    case 'GOOD':
      changedState = { ...state }
      changedState.good++
      return changedState
    case 'OK':
      changedState = { ...state }
      changedState.ok++
      return changedState
    case 'BAD':
      changedState = { ...state }
      changedState.bad++
      return changedState
    case 'ZERO':
      changedState = initialState
      return changedState
    default: return state
  }
  
}

export default counterReducer