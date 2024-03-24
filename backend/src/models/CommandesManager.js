const AbstractManager = require("./AbstractManager");

class CommandesManager extends AbstractManager {
  constructor() {
    super({ table: "commandes" });
  }

  async readAll() {
    const [rows] = await this.database.query(`
	SELECT 
    commandes.id,
    commandes.date_commande,
    commandes.statut,
    CONCAT(utilisateurs.nom, ' ', utilisateurs.prénom) AS nomAcheteur,
    COUNT(commande_article.articles_id) AS nombreArticle,
    SUM(articles.prix * commande_article.quantité) AS totalCommande
FROM commandes
JOIN commande_article ON commandes.id = commande_article.commandes_id
JOIN articles ON commande_article.articles_id = articles.id
JOIN utilisateurs ON commandes.utilisateurs_id = utilisateurs.id
GROUP BY commandes.id, commandes.date_commande, commandes.statut, utilisateurs.nom, utilisateurs.prénom
    `);
    return rows;
  }

  async create(utilisateurId, articles) {
    const [commande] = await this.database.query(
      `INSERT INTO commandes (statut, utilisateurs_id) VALUES ('en préparation', ?)`,
      [utilisateurId]
    );

    const insertions = articles.map((article) =>
      this.database.query(
        `INSERT INTO commande_article (quantité, commandes_id, articles_id) VALUES (?, ?, ?)`,
        [article.quantité, commande.insertId, article.id]
      )
    );

    await Promise.all(insertions);

    return commande.insertId;
  }
}

module.exports = CommandesManager;
