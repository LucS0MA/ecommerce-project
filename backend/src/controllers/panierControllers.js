const models = require("../modelsProviders");

const add = async (req, res) => {
  const cart = req.body;

  try {
    const result = await models.panier_article.create(cart);

    res.status(201).json({ result });
  } catch (err) {
    console.error(err);
  }
};

const read = async (req, res) => {
  try {
    const cart = await models.panier_article.read(req.query);

    if (cart == null) {
      if (req.query.utilisateurId && req.query.articleId) {
        res.json(0);
      } else {
        res.sendStatus(404);
      }
    } else {
      res.json(`quantité: ${cart.quantité}`);
    }
  } catch (err) {
    console.error(err);
  }
};

const browse = async (req, res) => {
  try {
    const cart = await models.panier_article.readAll(req.params.id);

    if (cart == null) {
      res.sendStatus(404);
    } else {
      res.json(cart);
    }
  } catch (err) {
    console.error(err);
  }
};

const destroy = async (req, res) => {
  try {
    const affectedRows = await models.panier_article.delete(
      req.query.utilisateurId,
      req.query.articleId
    );

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    console.error(err);
  }
};

const edit = async (req, res) => {
  try {
    const cart = await models.panier_article.update(
      req.query,
      req.body.quantité
    );

    if (cart.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  add,
  read,
  browse,
  destroy,
  edit,
};
