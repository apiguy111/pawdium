const express = require("express");

const {
    uploadPetImageController,
    createPet,
    getPet,
    getAllPets,
    getPetsByCountry,
    getPetsByCity,
    searchPetsByName,
    searchPets,
    getPetsByType,
    incrementPetViews,
    getPetStats,
    getNewPets,
} = require("../controllers/pet");
const multer = require("multer");
const upload = multer();
const router = express.Router();

router.post("/upload", upload.single("image"), uploadPetImageController);
router.post("/create", upload.single("image"), createPet);
router.get("/all", getAllPets);
router.get("/stats", getPetStats);
router.get("/new", getNewPets);
router.get("/search", searchPets);
router.get("/search/:petName", searchPets);
router.get("/country/:country", getPetsByCountry);
router.get("/city/:city", getPetsByCity);
router.get("/type/:petType", getPetsByType);
router.post("/:id/views", incrementPetViews);
router.get("/:id", getPet);

module.exports = router;