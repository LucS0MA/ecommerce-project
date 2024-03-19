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

const add = async (req, res) => {
  try {
    const insertId = await models.paiements.create(req.body);

    res.status(201).json({ insertId });
  } catch (err) {
    console.error(err);
  }
};

const destroy = async (req, res) => {
  try {
    const result = await models.paiements.delete(req.params.id);

    if (result === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(200);
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  browse,
  read,
  add,
  destroy,
};
