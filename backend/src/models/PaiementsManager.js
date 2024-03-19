const AbstractManager = require("./AbstractManager");

class PaiementsManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "paiements" as configuration
    super({ table: "paiements" });
  }

  // The C of CRUD - Create operation

  async create(paiement) {
    // Execute the SQL INSERT query to add a new paiements to the "paiements" table
    const [result] = await this.database.query(
      `insert into ${this.table} (titulaire,numero,expiration,cvv) values (?,?,?,?)`,
      [paiement.titulaire, paiement.numero, paiement.expiration, paiement.cvv]
    );

    // Return the ID of the newly inserted paiements
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific paiements by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the paiements
    return rows[0];
  }

  async update(id, paiement) {
    const [user] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );
    let titulaire = "";
    let numero = "";
    let expiration = "";
    let cvv;

    if (paiement.titulaire) {
      titulaire = paiement.titulaire;
    } else if (user[0]) {
      titulaire = user[0].titulaire;
    }
    if (paiement.numero) {
      numero = paiement.numero;
    } else if (user[0]) {
      numero = user[0].numero;
    }
    if (paiement.expiration) {
      expiration = paiement.expiration;
    } else if (user[0]) {
      expiration = user[0].expiration;
    }
    if (paiement.cvv) {
      cvv = paiement.cvv;
    } else if (user[0]) {
      cvv = user[0].cvv;
    }

    const [rows] = await this.database.query(
      `UPDATE ${this.table} SET titulaire = ?,
      numero = ?,
      expiration = ?,
      cvv = ?
      WHERE id = ?`,
      [titulaire, numero, expiration, cvv, id]
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
}

module.exports = PaiementsManager;
