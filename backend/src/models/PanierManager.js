const AbstractManager = require("./AbstractManager");

class PanierManager extends AbstractManager {
  constructor() {
    super({ table: "panier_article" });
  }

  async create(cart) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (quantité, articles_id, utilisateurs_id) VALUES (?, ?, ?)`,
      [cart.quantité, cart.articleId, cart.utilisateurId]
    );

    return result;
  }

  async read(cart) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE utilisateurs_id = ? AND articles_id = ?`,
      [cart.utilisateurId, cart.articleId]
    );
    return rows[0];
  }

  async readAll(id) {
    const [rows] = await this.database.query(
      `SELECT panier_article.quantité, articles_id, articles.nom, articles.prix FROM ${this.table}
      LEFT JOIN articles ON articles_id = articles.id
      WHERE utilisateurs_id = ?`,
      [id]
    );

    return rows;
  }

  async delete(utilisateurId, articleId) {
    const [rows] = await this.database.query(
      `DELETE FROM ${this.table} WHERE utilisateurs_id = ? AND articles_id = ?`,
      [utilisateurId, articleId]
    );

    return rows.affectedRows;
  }

  async update(cart, quantity) {
    const [rows] = await this.database.query(
      `UPDATE ${this.table} SET quantité = ? WHERE utilisateurs_id = ? AND articles_id = ?`,
      [quantity, cart.utilisateurId, cart.articleId]
    );

    return rows;
  }
}

module.exports = PanierManager;
