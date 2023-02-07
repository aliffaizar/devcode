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
      data: allTodos.map((todo) => ({
        id: todo.todo_id,
        title: todo.title,
        priority: todo.priority,
        is_active: todo.is_active,
        created_at: todo.created_at,
        updated_at: todo.updated_at,
      })),
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
      data: {
        id: oneTodo.todo_id,
        title: oneTodo.title,
        priority: oneTodo.priority,
        created_at: oneTodo.created_at,
        updated_at: oneTodo.updated_at,
      },
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
      data: {
        id: newTodo.todo_id,
        title: newTodo.title,
        activity_group_id: newTodo.activity_group_id,
        priority: newTodo.priority,
        is_active: newTodo.is_active,
        created_at: newTodo.created_at,
        updated_at: newTodo.updated_at,
      },
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
    await todoToUpdate.update(req.body)
    res.status(200).json({
      status: 'Success',
      message: 'Success',
      data: {
        id: todoToUpdate.todo_id,
        activity_group_id: todoToUpdate.activity_group_id,
        title: todoToUpdate.title,
        priority: todoToUpdate.priority,
        created_at: todoToUpdate.created_at,
        updated_at: todoToUpdate.updated_at,
      },
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
