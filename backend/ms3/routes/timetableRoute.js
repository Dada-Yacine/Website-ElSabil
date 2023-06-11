var express = require('express');
var router = express.Router();
const TimetableController = require('../controllers/timetableController');


router.post('/', TimetableController.create);
router.get('/bygroup/:id', TimetableController.getTimetableByGroup);
router.get('/byteacher/:id', TimetableController.getTimetableByTeacher);
router.get('/bycourse/:id', TimetableController.getTimetableByCourse);
router.get('/filter/:group_id?/:teacher_id?/:classroom_id?',
    TimetableController.getTimetableByGroupAndTeacherAndClassroom);
router.put('/:id', TimetableController.update);
router.delete('/:id', TimetableController.delete);

module.exports = router;
