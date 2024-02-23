const AbstractManager = require("./AbstractManager");

class ArticlesManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "item" as configuration
    super({ table: "articles" });
  }

  // The C of CRUD - Create operation

  async create(article) {
    // Execute the SQL INSERT query to add a new item to the "item" table
    const [result] = await this.database.query(
      `insert into ${this.table} (nom,image,prix,ajout_date,nb_ventes,taille,vendeuse,quantité) values (?,?,?,?,?,?,?,?)`,
      [
        article.nom,
        article.image,
        article.prix,
        article.ajout_date,
        article.nb_ventes,
        article.taille,
        article.vendeuse,
        article.quantité,
      ]
    );

    // Return the ID of the newly inserted item
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the item
    return rows[0];
  }

  async readAll(filtres) {
    let sql = `SELECT DISTINCT articles.id, nom, image, prix, ajout_date, nb_ventes, taille, vendeuse, quantité FROM ${this.table}
    LEFT JOIN couleurs_has_articles ON couleurs_has_articles.articles_id = articles.id
    LEFT JOIN couleurs ON couleurs.id = couleurs_has_articles.couleurs_id
    LEFT JOIN thematiques_has_articles ON thematiques_has_articles.articles_id = articles.id
    LEFT JOIN thematiques ON thematiques.id = thematiques_has_articles.thematiques_id
    LEFT JOIN types_has_articles ON types_has_articles.articles_id = articles.id
    LEFT JOIN types ON types.id = types_has_articles.types_id `;
    const select = sql;
    const sqlValues = [];

    if (filtres.couleurs) {
      if (filtres.couleurs[1].length > 1) {
        for (let i = 0; i < filtres.couleurs.length; i + 1) {
          sql += ` INTERSECT ${select}WHERE couleurs.couleur = ?`;
          sqlValues.push(filtres.couleurs[i]);
        }
      } else {
        sql += "WHERE couleurs.couleur = ?";
        sqlValues.push(filtres.couleurs);
      }

      // COULEURS +
      if (filtres.thematiques) {
        if (filtres.thematiques[1].length > 1) {
          for (let i = 0; i < filtres.thematiques.length; i + 1) {
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
            for (let i = 0; i < filtres.types.length; i + 1) {
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
          for (let i = 0; i < filtres.types.length; i + 1) {
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
        for (let i = 0; i < filtres.thematiques.length; i + 1) {
          sql += ` INTERSECT ${select}WHERE thematiques.thematique = ?`;
          sqlValues.push(filtres.thematiques[i]);
        }
      } else {
        sql += "WHERE thematiques.thematique = ?";
        sqlValues.push(filtres.thematiques);
      }

      // THEMATIQUES +
      if (filtres.types) {
        if (filtres.types[1].length > 1) {
          for (let i = 0; i < filtres.types.length; i + 1) {
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
        for (let i = 0; i < filtres.types.length; i + 1) {
          sql += ` INTERSECT ${select}WHERE types.type = ?`;
          sqlValues.push(filtres.types[i]);
        }
      } else {
        sql += "WHERE types.type = ?";
        sqlValues.push(filtres.types);
      }
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
    let nom = "";
    let image = "";
    let prix;
    let ajoutDate = "";
    let nbVentes;
    let taille;
    let vendeuse = "";
    let quantité;

    if (article.nom) {
      nom = article.nom;
    } else if (product[0]) {
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
      ajoutDate = product[0].ajoutDate;
    }
    if (article.nbVentes) {
      nbVentes = article.nbVentes;
    } else if (product[0]) {
      nbVentes = product[0].nbVentes;
    }
    if (article.taille) {
      taille = article.taille;
    } else if (product[0]) {
      taille = product[0].taille;
    }
    if (article.vendeuse) {
      vendeuse = article.vendeuse;
    } else if (product[0]) {
      vendeuse = product[0].vendeuse;
    }
    if (article.quantité) {
      quantité = article.quantité;
    } else if (product[0]) {
      quantité = product[0].quantité;
    }

    const [rows] = await this.database.query(
      `UPDATE ${this.table} SET nom = ?,
      image = ?,
      prix = ?,
      ajout_date = ?,
      nb_ventes = ?,
      taille = ?,
      vendeuse = ?,
      quantité = ?
      WHERE id = ?`,
      [nom, image, prix, ajoutDate, nbVentes, taille, vendeuse, quantité, id]
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

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing item

  // async update(item) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an item by its ID

  // async delete(id) {
  //   ...
  // }
}

module.exports = ArticlesManager;
