const express = require('express');
const router = express.Router();
const AppController = require('../controllers/AppController');

// Rotas de Schedule
router.post('/schedule/add', AppController.addSchedule);
router.patch('/schedule/edit', AppController.editSchedule);
router.delete('/schedule/delete', AppController.deleteSchedule);

// Rotas de User
router.post('/user/add', AppController.addUser);
router.patch('/user/edit', AppController.editUser);
router.delete('/user/delete', AppController.deleteUser);
router.get('/user/:id', AppController.findUserById);

// Rotas de Group
router.post('/group/add', AppController.addGroup);
router.patch('/group/edit', AppController.editGroup);
router.delete('/group/delete', AppController.deleteGroup);
router.post('/group/add-member', AppController.addMember);
router.delete('/group/remove-member', AppController.removeMember);

// Rotas de Tag
router.post('/tag/add', AppController.addTag);
router.patch('/tag/edit', AppController.editTag);
router.delete('/tag/delete', AppController.deleteTag);

// Rotas de Event
router.post('/event/add', AppController.addEvent);
router.patch('/event/edit', AppController.editEvent);
router.delete('/event/delete', AppController.deleteEvent);

module.exports = router;