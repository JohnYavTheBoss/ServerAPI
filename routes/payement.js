const {Router} = require('express');
const {getAllPayement, addPayement, getPayement, approuverPayement, rejeterPayement} = require('../controllers/payement');

const router = Router();

router.get('/payement/:id', getPayement);
router.get("/payement/", getAllPayement);
router.post('/payement/add', addPayement);
router.put('/payement/approuver/:idPayement', approuverPayement);
router.put('/payement/rejeter/:idPayement', rejeterPayement);

module.exports = router;