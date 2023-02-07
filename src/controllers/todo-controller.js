const Todo = require('../models/todo-model')

const getAllTodos = async (req, res) => {
  const { activity_group_id } = req.query
  try {
    const allTodos = await Todo.findAll({
      where: {
        activity_group_id,
      },
    })
    res.json({
      status: 'Success',
      message: 'Success',
      data: allTodos,
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const getTodo = async (req, res) => {
  try {
    const { id } = req.params
    const oneTodo = await Todo.findByPk(id)
    if (!oneTodo) {
      return res.status(404).json({
        status: 'Not Found',
        message: `Todo with ID ${id} Not Found`,
      })
    }
    res.json({
      status: 'Success',
      message: 'Success',
      data: oneTodo,
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const createTodo = async (req, res) => {
  const { activity_group_id, title } = req.body
  if (!activity_group_id) {
    return res.status(400).json({
      status: 'Bad Request',
      message: 'activity_group_id cannot be null',
    })
  }
  if (!title) {
    return res.status(400).json({
      status: 'Bad Request',
      message: 'title cannot be null',
    })
  }

  try {
    const newTodo = await Todo.create(req.body)
    res.status(201).json({
      status: 'Success',
      message: 'Success',
      data: newTodo,
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params
    const todoToUpdate = await Todo.findByPk(id)
    if (!todoToUpdate) {
      return res.status(404).json({
        status: 'Not Found',
        message: `Todo with ID ${id} Not Found`,
        data: {},
      })
    }
    const newTodo = await todoToUpdate.update(req.body)
    res.status(200).json({
      status: 'Success',
      message: 'Success',
      data: newTodo,
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params
    const todoToDelete = await Todo.findByPk(id)
    if (!todoToDelete) {
      return res.status(404).json({
        status: 'Not Found',
        message: `Todo with ID ${id} Not Found`,
      })
    }
    await todoToDelete.destroy()
    res.json({
      status: 'Success',
      message: 'Success',
      data: {},
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = {
  getAllTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
}
