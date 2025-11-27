const express = require('express');
const router = express.Router();
const board = require('../controllers/boardController');

router.get('/', board.list);
router.get('/view/:id', board.view);

router.get('/write', board.writeForm);
router.post('/write', board.write);

router.get('/edit/:id', board.editForm);
router.post('/edit/:id', board.edit);

router.post('/delete/:id', board.delete);

module.exports = router;
