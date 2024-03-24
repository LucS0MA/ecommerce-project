const models = require("../modelsProviders");

const browse = async (req, res) => {
  try {
    const commandes = await models.commandes.readAll();
    res.json(commandes);
  } catch (err) {
    console.error(err);
    res.status(404).json({
      message:
        "Erreur serveur lors de la récupération des détails des commandes.",
    });
  }
};

const add = async (req, res) => {
  try {
    const commande = await models.commandes.create(
      req.auth.id,
      req.body.articles
    );
    res.status(201).json(commande);
  } catch (err) {
    console.error(err);
    res
      .status(404)
      .json({ message: "Erreur lors de la création de la commande." });
  }
};

module.exports = {
  browse,
  add,
};
