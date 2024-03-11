const models = require("../modelsProviders");

const read = async (req, res) => {
  try {
    const fav = await models.isFav.read(req.query);

    // Si le favori n'existe pas
    if (fav == null) {
      // et si le FRONT a bien envoyé l'id de l'uitlisateur ainsi que l'id de l'article au BACK
      if (req.query.utilisateurId && req.query.articleId) {
        // Alors envoyer 0 au FRONT, afin qu'il ait l'information de l'abscence de l'article en question dans la table des favoris
        res.json(0);
      } else {
        // Envoyer une erreur 404 si le FRONT n'a pas envoyé l'id de l'utilisateur (utilisateurId) et / ou l'id de l'article (articleId) au BACK
        res.sendStatus(404);
      }
    } else {
      // Envoyer 1 au FRONT, afin qu'il est l'information de la présence de l'article en question dans la table des favoris
      res.json(1);
    }
  } catch (err) {
    console.error(err);
  }
};

const browse = async (req, res) => {
  try {
    const fav = await models.isFav.readAll(req.params.id);

    if (fav == null) {
      res.sendStatus(404);
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
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  read,
  browse,
  add,
  destroy,
};
