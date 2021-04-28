import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const update = async (id) => {
  const { data: anecdote } = await axios.get(`${baseUrl}/${id}`)
  const { data: anecdoteVoted } = await axios.patch(`${baseUrl}/${id}`, { votes: anecdote.votes + 1 })
  return anecdoteVoted
}

export default {
  getAll,
  createNew,
  update
}