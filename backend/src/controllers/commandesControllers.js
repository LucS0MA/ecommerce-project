const models = require("../modelsProviders");

const browse = async (req, res) => {
  try {
    const commandes = await models.commandes.readAll();
    res.json(commandes);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message:
        "Erreur serveur lors de la récupération des détails des commandes.",
    });
  }
};

module.exports = {
  browse,
};
