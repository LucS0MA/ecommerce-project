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
}

module.exports = CommandesManager;
