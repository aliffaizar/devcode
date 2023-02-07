const { DataTypes } = require('sequelize')
const db = require('../config/database')

const Activity = db.define(
  'Activity',
  {
    activity_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    timestamps: true,
    tableName: 'activities',
  }
)

module.exports = Activity
