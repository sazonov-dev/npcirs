const express = require('express');
const router = require('express').Router();
const mainController = require('../controllers/mainController');

router.get('/tables', mainController.getInfo);
router.post('/addNote', mainController.addNote);
router.post('/editNote', mainController.editNote);
router.post('/deleteNote', mainController.deleteNote);

module.exports = router;
