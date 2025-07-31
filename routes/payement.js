const {Router} = require('express');
const {getAllPayement, addPayement, getPayement} = require('../controllers/payement');

const router = Router();

router.get('/payement/:id', getPayement);
router.get("/payement/", getAllPayement);
router.post('/payement/add', addPayement);

module.exports = router;