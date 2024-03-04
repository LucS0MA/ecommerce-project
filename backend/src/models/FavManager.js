const AbstractManager = require("./AbstractManager");

class FavManager extends AbstractManager {
  constructor() {
    super({ table: "isFav" });
  }

  async create(item) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (utilisateurs_id, articles_id) VALUES (?, ?)`,
      [item.utilisateurId, item.articleId]
    );

    return result;
  }

  async read(fav) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE utilisateurs_id = ? AND articles_id = ?`,
      [fav.utilisateurId, fav.articleId]
    );

    return rows[0];
  }

  async delete(utilisateurId, articleId) {
    const [rows] = await this.database.query(
      `DELETE FROM ${this.table} WHERE utilisateurs_id = ? AND articles_id = ?`,
      [utilisateurId, articleId]
    );

    return rows.affectedRows;
  }
}

module.exports = FavManager;
