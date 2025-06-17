const { Router } = require('express');
const { getEleve, getAllEleve } = require('../controllers/eleve');
const router = Router();

router.get('/eleve/:id', getEleve);
router.get('/eleve/', getAllEleve);


module.exports = router;