const models = require("../modelsProviders");

const read = async (req, res) => {
  try {
    const fav = await models.isFav.read(req.query);

    if (fav == null) {
      // res.sendStatus(404);
    } else {
      res.json(fav);
    }
  } catch (err) {
    console.error(err);
  }
};

const add = async (req, res) => {
  const fav = req.body;

  try {
    const result = await models.isFav.create(fav);

    res.status(201).json({ result });
  } catch (err) {
    console.error(err);
  }
};

const destroy = async (req, res) => {
  try {
    const affectedRows = await models.isFav.delete(
      req.query.utilisateurId,
      req.query.articleId
    );

    if (affectedRows === 0) {
      // res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  read,
  add,
  destroy,
};
