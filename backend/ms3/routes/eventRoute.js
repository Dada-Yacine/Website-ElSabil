var express = require('express');
var router = express.Router();
var path = require('path');
const EventController = require('../controllers/eventController');

const multer  = require('multer');
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../public/images'))
    },
    filename: function (req, file, cb) {
      let extArray = file.mimetype.split("/");
      let extension = extArray[extArray.length - 1];
      cb(null, file.fieldname + '-' + Date.now()+ '.' +extension)
    }
  })
  const upload = multer({ storage: storage })

router.post('/', upload.single('image'), EventController.create);
router.get('/', EventController.getAll);
router.get('/byYear/:id', EventController.getEventsByYear);
router.put('/:id', upload.single('image'),EventController.update);
router.delete('/:id', EventController.delete);

module.exports = router;
