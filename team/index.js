const express = require('express');
const router = express.Router();
const controller = require('./todo.controller');


router.get('/', controller.getAll);
router.get('/:id', controller.getOne);
router.post('/', controller.create);
router.put('/:id',controller.update);
router.delete('/c',controller.dall);
router.delete('/:id',controller.delete);



module.exports = router;