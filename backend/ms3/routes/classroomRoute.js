var express = require('express');
var router = express.Router();
const ClassroomController = require('../controllers/classroomController');


router.post('/', ClassroomController.create);
router.get('/', ClassroomController.getAll);
router.put('/:id', ClassroomController.update);
router.delete('/:id', ClassroomController.delete);

module.exports = router;
