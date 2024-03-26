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
    const result = await models.commandes.create(req.auth.id, req.body);

    res.status(201).json({ result });
  } catch (err) {
    console.error(err);
  }
};

const browseByUser = async (req, res) => {
  try {
    const commandes = await models.commandes.readAllByUser(req.auth.id);
    res.json(commandes);
  } catch (err) {
    console.error(err);
    res.status(404).json({
      message:
        "Erreur serveur lors de la récupération des détails des commandes.",
    });
  }
};

module.exports = {
  browse,
  add,
  browseByUser,
};
