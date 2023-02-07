const express = require('express')

const activityController = require('../controllers/activity-controller')

const router = express.Router()

router.get('/', activityController.getAllActivities)
router.get('/:id', activityController.getActivity)
router.post('/', activityController.createActivity)
router.patch('/:id', activityController.updateActivity)
router.delete('/:id', activityController.deleteActivity)

module.exports = router
