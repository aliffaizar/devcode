const express = require('express')

const todoController = require('../controllers/todo-controller')

const router = express.Router()

router.get('/', todoController.getAllTodos)
router.get('/:id', todoController.getTodo)
router.post('/', todoController.createTodo)
router.patch('/:id', todoController.updateTodo)
router.delete('/:id', todoController.deleteTodo)

module.exports = router
