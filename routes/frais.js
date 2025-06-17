const { Router } = require("express");
const { addFrais, deleteFraisCorbeille, updateFrais, getAllfrais, deleteFrais } = require("../controllers/frais");

const router = Router();

router.post("/frais/add", addFrais);
router.get("/frais/", getAllfrais);
router.put("/frais/update/:id", updateFrais);
router.put("/frais/delete/corbeille/:id", deleteFraisCorbeille);
router.delete("/frais/delete/:id", deleteFrais)

module.exports = router;