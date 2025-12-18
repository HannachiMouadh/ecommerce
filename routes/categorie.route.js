var express = require("express");
var router = express.Router();
// Créer une instance de categorie.
const Categorie = require("../model/categorie");
// afficher la liste des categories.
router.get("/", async (req, res) => {
  try {
    res.status(200).json(await Categorie.find());
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
// créer une nouvelle catégorie
router.post("/", async (req, res) => {
  const newcat = new Categorie(req.body);
  try {
    await newcat.save();
    res.status(200).json(newcat);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
// chercher une catégorie
router.get("/:categorieId", async (req, res) => {
  try {
    const cat = await Categorie.findById(req.params.categorieId);
    res.status(200).json(cat);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
// modifier une catégorie
router.put("/:categorieId", async (req, res) => {
  try {
    const cat1 = await Categorie.findByIdAndUpdate(
      req.params.categorieId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(cat1);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
// Supprimer une catégorie
router.delete("/:categorieId", async (req, res) => {
  const id = req.params.categorieId;
  await Categorie.findByIdAndDelete(id);
  res.json({ message: "categorie deleted successfully." });
});
module.exports = router;
