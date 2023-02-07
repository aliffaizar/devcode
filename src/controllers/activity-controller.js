const Activity = require('../models/activity-model')

const getAllActivities = async (req, res) => {
  try {
    const allActivities = await Activity.findAll()
    res.json({
      status: 'Success',
      message: 'Success',
      data: allActivities,
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const getActivity = async (req, res) => {
  try {
    const { id } = req.params
    const oneActivity = await Activity.findByPk(id)
    if (!oneActivity) {
      return res.status(404).json({
        status: 'Not Found',
        message: `Activity with ID ${id} Not Found`,
        data: {},
      })
    }
    res.json({
      status: 'Success',
      message: 'Success',
      data: oneActivity,
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const createActivity = async (req, res) => {
  try {
    if (!req.body.title) {
      return res.status(400).json({
        status: 'Bad Request',
        message: 'title cannot be null',
        data: {},
      })
    }
    if (!req.body.email) {
      return res.status(400).json({
        status: 'Bad Request',
        message: 'email cannot be null',
        data: {},
      })
    }
    const newActivity = await Activity.create(req.body)
    res.status(201).json({
      status: 'Success',
      message: 'Success',
      data: newActivity,
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const updateActivity = async (req, res) => {
  try {
    const { id } = req.params
    const activityToUpdate = await Activity.findByPk(id)
    if (!activityToUpdate) {
      return res.status(404).json({
        status: 'Not Found',
        message: `Activity with ID ${id} Not Found`,
      })
    }
    const updatedActivity = await activityToUpdate.update(req.body)

    res.json({
      status: 'Success',
      message: 'Success',
      data: updatedActivity,
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const deleteActivity = async (req, res) => {
  try {
    const { id } = req.params
    const activityToDelete = await Activity.findByPk(id)
    if (!activityToDelete) {
      return res.status(404).json({
        status: 'Not Found',
        message: `Activity with ID ${id} Not Found`,
        data: {},
      })
    }
    await activityToDelete.destroy()

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
  getAllActivities,
  getActivity,
  createActivity,
  updateActivity,
  deleteActivity,
}
