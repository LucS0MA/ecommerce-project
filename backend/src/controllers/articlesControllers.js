// Import access to database tables
const models = require("../modelsProviders");

// The B of BREAD - Browse (Read All) operation
const browse = (req, res) => {
  // Fetch all items from the database
  models.articles
    .findAll()
    .then((articles) => res.json(articles))
    .catch((err) => console.error(err));
};

// The R of BREAD - Read operation
const read = async (req, res) => {
  try {
    // Fetch a specific article from the database based on the provided ID
    const article = await models.articles.read(req.params.id);

    // If the article is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the article in JSON format
    if (article == null) {
      res.sendStatus(404);
    } else {
      res.json(article);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    console.error(err);
  }
};

module.exports = {
  browse,
  read,
};
