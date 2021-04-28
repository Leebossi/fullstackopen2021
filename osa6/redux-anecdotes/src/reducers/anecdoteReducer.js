import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE':
      return state.map(anecdote => (
        anecdote.id !== action.data.votedAnecdote.id
          ? anecdote
          : action.data.votedAnecdote))

    case 'NEW_ANECDOTE':
      return [...state, action.data]

    case 'INIT_ANECDOTES':
      return action.data

    default: return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const vote = id => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.update(id)
    dispatch({
      type: 'VOTE',
      data: {
        votedAnecdote,
      }
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAncdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAncdote,
    })
  }
}

export default reducer