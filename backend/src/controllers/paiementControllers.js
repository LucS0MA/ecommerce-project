const models = require("../modelsProviders");

const browse = (req, res) => {
  models.paiements
    .findAll()
    .then((paiements) => res.json(paiements))
    .catch((err) => console.error(err));
};

// Read
const read = async (req, res) => {
  try {
    const paiement = await models.paiements.read(req.params.id);

    if (paiement == null) {
      res.sendStatus(404);
    } else {
      res.json(paiement);
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  browse,
  read,
};
