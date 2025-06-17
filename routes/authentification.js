const { Router } = require("express");
const { signInEleve, signInComptable, loginEleve, loginComptable, logout } = require("../controllers/authentification");
const router = Router();

router.post("/register/eleve/", signInEleve);
router.post("/register/comptable/", signInComptable);
router.post("/login/eleve/", loginEleve);
router.post("/login/comptable/", loginComptable);
router.get("/logout/", logout);

module.exports = router;