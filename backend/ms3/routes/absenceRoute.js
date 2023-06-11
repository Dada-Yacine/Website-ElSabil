var express = require('express');
var router = express.Router();
const AbsenceController = require('../controllers/absenceController');


router.post('/', AbsenceController.create);
router.post('/multi', AbsenceController.createMulti);
router.get('/byStudent/:id', AbsenceController.getAbsencesByStudent);
router.get('/byTeacher/:id', AbsenceController.getAbsencesByTeacher);
router.get('/bygroup/:id', AbsenceController.getAbsencesByGroup);
router.get('/filter', AbsenceController.getAbsencesByGroupAndSessionAndDate);
router.get('/bysession/:id', AbsenceController.getAbsencesBySession);
router.get('/BySessionAndDate/:id/:date', AbsenceController.getAbsencesBySessionAndDate);
router.put('/:id', AbsenceController.update);
router.delete('/:id', AbsenceController.delete);

module.exports = router;
