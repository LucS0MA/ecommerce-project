const AbstractManager = require("./AbstractManager");

class ArticlesManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "item" as configuration
    super({ table: "articles" });
  }

  async create(article) {
    const [result] = await this.database.query(
      `insert into ${this.table} (nom, image, prix, ajout_date, nb_ventes, vendeuse) values (?, ?, ?, NOW(), 0, ?)`,
      [article.nom, article.image, article.prix, article.vendeuse]
    );

    return result.insertId;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    return rows[0];
  }

  async readAll(filtres) {
    let sql = `SELECT DISTINCT articles.id, nom, image, prix, ajout_date, nb_ventes, vendeuse, couleur, type, thematique FROM ${this.table}
    LEFT JOIN couleurs_has_articles ON couleurs_has_articles.articles_id = articles.id
    LEFT JOIN couleurs ON couleurs.id = couleurs_has_articles.couleurs_id
    LEFT JOIN thematiques_has_articles ON thematiques_has_articles.articles_id = articles.id
    LEFT JOIN thematiques ON thematiques.id = thematiques_has_articles.thematiques_id
    LEFT JOIN types_has_articles ON types_has_articles.articles_id = articles.id
    LEFT JOIN types ON types.id = types_has_articles.types_id `;
    const select = sql;
    const sqlValues = [];

    // Filtrer par 'nom'
    if (filtres.nom) {
      sql += " WHERE nom LIKE ? ";
      sqlValues.push(filtres.nom);
    } else {
      sql += " WHERE nom LIKE ? ";
      sqlValues.push("%");
    }

    // Filtrer par 'prix'
    if (filtres.minPrix) {
      sql += "AND prix >= ?";
      sqlValues.push(parseInt(filtres.minPrix, 10));

      // MINPRIX +
      if (filtres.maxPrix) {
        sql += " AND prix <= ?";
        sqlValues.push(parseInt(filtres.maxPrix, 10));
      }
    } else if (filtres.maxPrix) {
      sql += "AND prix <= ?";
      sqlValues.push(parseInt(filtres.maxPrix, 10));
    }

    // Filtrer par...
    if (filtres.couleurs) {
      if (filtres.couleurs[1].length > 1) {
        for (let i = 0; i < filtres.couleurs.length; i += 1) {
          sql += ` INTERSECT ${select}WHERE couleurs.couleur = ?`;
          sqlValues.push(filtres.couleurs[i]);
        }
      } else {
        sql += "AND couleurs.couleur = ?";
        sqlValues.push(filtres.couleurs);
      }

      // COULEURS +
      if (filtres.thematiques) {
        if (filtres.thematiques[1].length > 1) {
          for (let i = 0; i < filtres.thematiques.length; i += 1) {
            sql += ` INTERSECT ${select}WHERE thematiques.thematique = ?`;
            sqlValues.push(filtres.thematiques[i]);
          }
        } else {
          sql += "AND thematiques.thematique = ?";
          sqlValues.push(filtres.thematiques);
        }

        // COULEURS + THEMATIQUES +
        if (filtres.types) {
          if (filtres.types[1].length > 1) {
            for (let i = 0; i < filtres.types.length; i += 1) {
              sql += ` INTERSECT ${select}WHERE types.type = ?`;
              sqlValues.push(filtres.types[i]);
            }
          } else {
            sql += "AND types.type = ?";
            sqlValues.push(filtres.types);
          }
        }
      } else if (filtres.types) {
        if (filtres.types[1].length > 1) {
          for (let i = 0; i < filtres.types.length; i += 1) {
            sql += ` INTERSECT ${select}WHERE types.type = ?`;
            sqlValues.push(filtres.types[i]);
          }
        } else {
          sql += "AND types.type = ?";
          sqlValues.push(filtres.types);
        }
      }
    } else if (filtres.thematiques) {
      if (filtres.thematiques[1].length > 1) {
        for (let i = 0; i < filtres.thematiques.length; i += 1) {
          sql += ` INTERSECT ${select}WHERE thematiques.thematique = ?`;
          sqlValues.push(filtres.thematiques[i]);
        }
      } else {
        sql += "AND thematiques.thematique = ?";
        sqlValues.push(filtres.thematiques);
      }

      // THEMATIQUES +
      if (filtres.types) {
        if (filtres.types[1].length > 1) {
          for (let i = 0; i < filtres.types.length; i += 1) {
            sql += ` INTERSECT ${select}WHERE types.type = ?`;
            sqlValues.push(filtres.types[i]);
          }
        } else {
          sql += "AND types.type = ?";
          sqlValues.push(filtres.types);
        }
      }
    } else if (filtres.types) {
      if (filtres.types[1].length > 1) {
        for (let i = 0; i < filtres.types.length; i += 1) {
          sql += ` INTERSECT ${select}WHERE types.type = ?`;
          sqlValues.push(filtres.types[i]);
        }
      } else {
        sql += "AND types.type = ?";
        sqlValues.push(filtres.types);
      }
    }

    // Trier par...
    if (parseInt(filtres.nouveautes, 10) === 1) {
      sql += "ORDER BY ajout_date DESC";
    } else if (filtres.phares) {
      // NB_VENTES
      if (filtres.phares === "desc") {
        sql += "ORDER BY nb_ventes DESC";
      } else if (filtres.phares === "asc") {
        sql += "ORDER BY nb_ventes ASC";
      }
    } else if (filtres.price) {
      // PRIX
      if (filtres.price === "desc") {
        sql += "ORDER BY prix DESC";
      } else if (filtres.price === "asc") {
        sql += "ORDER BY prix ASC";
      }
    }

    // LIMIT
    if (filtres.limit) {
      sql += " LIMIT ?";
      sqlValues.push(parseInt(filtres.limit, 10));
    }

    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await this.database.query(sql, sqlValues);

    // Return the array of items
    return rows;
  }

  async update(id, article) {
    const [product] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );
    // Initialisation des variables
    let nom = "";
    let image = "";
    let prix;
    let ajoutDate = "";
    let nbVentes;
    let vendeuse = "";

    // Si le FRONT envoie un nouveau nom pour l'article au BACK
    if (article.nom) {
      // alors on attribue le nouveau nom à la variable initialisée
      nom = article.nom;
      // Sinon, et si l'article avait déjà un nom
    } else if (product[0]) {
      // alors on attribue l'ancien nom à la variable initialisée
      nom = product[0].nom;
    }
    if (article.image) {
      image = article.image;
    } else if (product[0]) {
      image = product[0].image;
    }
    if (article.prix) {
      prix = article.prix;
    } else if (product[0]) {
      prix = product[0].prix;
    }
    if (article.ajoutDate) {
      ajoutDate = article.ajoutDate;
    } else if (product[0]) {
      ajoutDate = product[0].ajout_date;
    }
    if (article.nbVentes) {
      nbVentes = article.nbVentes;
    } else if (product[0]) {
      nbVentes = product[0].nb_ventes;
    }
    if (article.vendeuse) {
      vendeuse = article.vendeuse;
    } else if (product[0]) {
      vendeuse = product[0].vendeuse;
    }

    // Attribution des variables initialisées à la base de donnée
    const [rows] = await this.database.query(
      `UPDATE ${this.table} SET nom = ?,
      image = ?,
      prix = ?,
      ajout_date = ?,
      nb_ventes = ?,
      vendeuse = ?,
      WHERE id = ?`,
      [nom, image, prix, ajoutDate, nbVentes, vendeuse, id]
    );

    return rows.affectedRows;
  }

  async delete(id) {
    const [rows] = await this.database.query(
      `DELETE couleurs_has_articles, ${this.table} FROM ${this.table}
      JOIN couleurs_has_articles
      ON ${this.table}.id = couleurs_has_articles.${this.table}_id
      WHERE ${this.table}.id = ?`,
      [id]
    );

    return rows.affectedRows;
  }
}

module.exports = ArticlesManager;
