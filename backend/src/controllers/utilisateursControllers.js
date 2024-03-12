// Import access to database tables
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
  const { email, password } = req.body; // Récupère l'email et le mot de passe de la requête

  try {
    const salt = await bcrypt.genSalt(10); // Génère un salage
    const hashedPassword = await bcrypt.hash(password, salt); // Hache le mot de passe avec le salage

    // Insère l'utilisateur avec le mot de passe haché dans la base de données
    const utilisateur = await models.utilisateurs.create({
      email,
      password: hashedPassword, // Utilise le mot de passe haché
    });

    res.status(201).json(utilisateur); // Répond avec l'utilisateur créé
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
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

function login(req, res) {
  const { email, password } = req.body;

  try {
    // on recherche l'utilisateur par l'email dans la base de données
    models.utilisateurs.findByEmail(email).then((utilisateur) => {
      if (!utilisateur) {
        return res.status(401).json({ message: "Identifiants incorrects" });
      }
      // on compare le mot de passe fourni avec le mot de passe hashé dans la bdd
      bcrypt.compare(password, utilisateur.password).then((passwordMatch) => {
        // Si les mots de passe correspondent on crée un token qui va contenir l'id et l'email de l'utilisateur
        if (passwordMatch) {
          // Création du token avec une expiration d'une heure (vous pouvez ajuster cela selon vos besoins)
          const token = jwt.sign(
            { id: utilisateur.id, email: utilisateur.email },
            process.env.APP_SECRET, // replace with your own secret key
            { expiresIn: "1h" }
          );

          // là on envoie le token au client avec un message de connexion réussie
          res.status(200).json({ message: "Connexion réussie", token });
        } else {
          // Si y'a une couille dans le paté bah on renvoie un message d'erreur
          res.status(401).json({ message: "Identifiants incorrects" });
        }
      });
      return null;
    });
  } catch (error) {
    console.error("Server-side error", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
}

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  login,
};
