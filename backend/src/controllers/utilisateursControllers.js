const models = require("../modelsProviders");

const browse = (req, res) => {
  models.utilisateurs
    .findAll()
    .then((utilisateurs) => res.json(utilisateurs))
    .catch((err) => console.error(err));
};

const read = async (req, res) => {
  try {
    const utilisateur = await models.utilisateurs.read(req.params.id);

    if (utilisateur == null) {
      res.sendStatus(404);
    } else {
      res.json(utilisateur);
    }
  } catch (err) {
    console.error(err);
  }
};

const add = async (req, res) => {
  const utilisateur = req.body;

  try {
    const insertId = await models.utilisateurs.create(utilisateur);

    res.status(201).json({ insertId });
  } catch (err) {
    console.error(err);
  }
};

const edit = async (req, res) => {
  try {
    const affectedRows = await models.utilisateurs.update(
      req.params.id,
      req.body
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

const destroy = async (req, res) => {
  try {
    const affectedRows = await models.utilisateurs.delete(req.params.id);

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    console.error(err);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const utilisateur = await models.utilisateurs.findByEmail(email);

    if (utilisateur && utilisateur.password === password) {
      res.status(200).json({ message: "Connexion réussie", utilisateur });
    } else {
      res.status(401).json({ message: "Identifiants incorrects" });
    }
  } catch (error) {
    console.error("Server-side error");
    res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  login,
};
