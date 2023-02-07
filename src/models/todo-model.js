const { DataTypes } = require('sequelize')
const db = require('../config/database')

const Todo = db.define(
  'Todo',
  {
    todo_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    activity_group_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    priority: {
      type: DataTypes.STRING,
      defaultValue: 'very-high',
    },
  },
  {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    timestamps: true,
    tableName: 'todos',
  }
)

module.exports = Todo
