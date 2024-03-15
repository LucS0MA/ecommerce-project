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
      `insert into ${this.table} (email,password) values (?,?)`,
      [paiement.email, paiement.password]
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

  async readAll() {
    // Execute the SQL SELECT query to retrieve all paiements from the "paiements" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of paiements
    return rows;
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
      cvv = ?`,
      [titulaire, numero, expiration, cvv]
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
  // TODO: Implement the update operation to modify an existing paiements

  // async update(paiements) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an paiements by its ID

  // async delete(id) {
  //   ...
  // }
  async findByEmail(email) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE email = ?`,
      [email]
    );

    return rows[0];
  }
}

module.exports = PaiementsManager;
