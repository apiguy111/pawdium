const express = require("express");

const {
    uploadPetImageController,
    createPet,
    getPet,
    getAllPets,
    getPetsByCountry,
    getPetsByCity,
    searchPetsByName,
    getPetsByType,
    incrementPetViews,
} = require("../controllers/pet");
const multer = require("multer");
const upload = multer();
const router = express.Router();

router.post("/upload", upload.single("image"), uploadPetImageController);
router.post("/create", upload.single("image"), createPet);
router.get("/all", getAllPets);
router.get("/country/:country", getPetsByCountry);
router.get("/city/:city", getPetsByCity);
router.get("/search/:petName", searchPetsByName);
router.get("/type/:petType", getPetsByType);
router.post("/:id/views", incrementPetViews);
router.get("/:id", getPet);

module.exports = router;