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

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

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
      `DELETE FROM ${this.table} WHERE id = ?`,
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
